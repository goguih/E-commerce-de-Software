import { ProductInterface } from './../interfaces/ProductInterface';
import httpStatus from 'http-status';
import { hash } from 'bcryptjs';
import { UserInterface } from './../interfaces/UserInterface';
import { UpdateUserInterface } from './../interfaces/User/UpdateUserInterface';
import { UpdateUserPasswordInterface } from './../interfaces/User/UpdateUserPasswordInterface';
import UserRepository from "../database/repositories/UserRepository";
import { UserRecoverPasswordInterface } from '../interfaces/User/UserRecoverPasswordInterface';
import AppError from '../utilities/errors/AppError';
import SendMail from '../mechanisms/SendMail';
import { MailType } from '../enumerators/mailType';
import Numbers from '../utilities/numbers';
import { UserCodeVerificationValidate } from '../interfaces/User/UserCodeVerificationValidate';
import ScheduleJobs from '../jobs/ScheduleJobs';
import ProductService from './ProductService';
import CouponService from './CouponService';
import { CouponExistsType } from '../enumerators/couponExistsType';
import { ProductsCartUser } from '../enumerators/productsCartUser';
import { CalculateCartInterface } from '../interfaces/User/CalculateCartInterface';

export default class UserService {
  public static async getAll(): Promise<Array<UserInterface>> {
    const userFound = await UserRepository.getAll();
    return userFound;
  }

  public static async getByCPF(cpf: string): Promise<UserInterface> {
    const userFound = await UserRepository.selectOne({ cpf });
    return userFound;
  }

  public static async getByEmail(email: string): Promise<UserInterface> {
    const userFound = await UserRepository.selectOne({ email });
    return userFound;
  }

  public static async create(user: UserInterface): Promise<UserInterface> {
    const cpfExists = await UserService.getByCPF(user.cpf);

    if (cpfExists) {
      throw new AppError('CPF já está em uso.', httpStatus.CONFLICT);
    }

    const emailExists = await UserService.getByEmail(user.email);

    if (emailExists) {
      throw new AppError('E-mail já está em uso.', httpStatus.CONFLICT);
    }

    const hashedPassword = await hash(user.password, 8);

    const userCreated = await UserRepository.create({
      name: user.name,
      last_name: user.last_name,
      cpf: user.cpf,
      email: user.email,
      password: hashedPassword,
      birth_date: user.birth_date,
      phone: user.phone,
    });

    return userCreated;
  }

  public static async update({ cpf, user }: UpdateUserInterface): Promise<UserInterface> {
    await UserRepository.update({ cpf, user });
    const userUpdated = await UserService.getByCPF(cpf);
    return userUpdated;
  }

  public static async updatePassword({ cpf, password, passwordConfirm }: UpdateUserPasswordInterface): Promise<UserInterface> {
    if (!password) {
      throw new AppError('Campo senha vazio', httpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(password, 8);

    await UserRepository.update({ cpf, user: { password: hashedPassword }});
    const userUpdated = await UserService.getByCPF(cpf);
    
    return userUpdated;
  }

  public static async delete(cpf: string): Promise<UserInterface> {
    const userDeleted = await UserRepository.delete(cpf);
    return userDeleted;
  }

  public static async recoveryPassword({ email }: UserRecoverPasswordInterface): Promise<any | null> {
    const user = await UserService.getByEmail(email);

    if (!user) {
      throw new AppError('Não há nenhum usuário cadastrado com esse e-mail', httpStatus.NOT_FOUND);
    }

    if (user.codeVerification) {
      throw new AppError('Aguarde para solicitar novamente a recuperação de senha', httpStatus.TOO_MANY_REQUESTS);
    }

    const data = {
      email,
      name: user.name + ' ' + user.last_name,
      codeVerification: Numbers.generateCodeVerification()
    }

    await SendMail.sendMail(data, MailType.PASSWORD_RECOVERY);
    await UserService.update({ cpf: user.cpf, user: { codeVerification: data.codeVerification } });
    await ScheduleJobs.scheduleExpireCodeVerification(user.cpf);

    return { message: 'E-mail enviado com sucesso!' };
  }

  public static async codeVerificationValidate({ codeVerification, cpf }: UserCodeVerificationValidate): Promise<any> {
    if (!codeVerification || codeVerification.length !== 6) {
      throw new AppError('Código de validação não pode ser nulo e deve ter 6 caracteres', httpStatus.BAD_REQUEST);
    }

    const user = await UserService.getByCPF(cpf);
    
    if(codeVerification !== user.codeVerification) {
      throw new AppError('Esse código de validação não está vinculado a sua conta', httpStatus.NOT_FOUND);
    }

    await UserService.update({ cpf, user: { codeVerification: '' } });
    return { message: 'Código de Verificação validado com sucesso!' };
  }

  public static async calculateCart({ cpf, couponName }: CalculateCartInterface): Promise<any> {
    let subTotal = 0;

    const { productsInCart } = await UserService.getAllCart(cpf);

    productsInCart.map((item: any) => {
      subTotal += item.price;
    });

    const coupon = await CouponService.getByName(couponName, CouponExistsType.OPTIONAL);

    let response;
    if (coupon) {
      const discountValue = subTotal * coupon.value;
      const total = subTotal - discountValue;

      response = { total, subTotal, discountValue }
    } else {
      const total = subTotal;
      response = { total, subTotal }
    }
    
    return response;
  }

  public static async getAllCart(cpf: string): Promise<any> {
    let user = await UserService.getByCPF(cpf);

    let productsInCart = [];

    for (let key in user.productsInCart) {
      const product = await ProductService.getById(user.productsInCart[key as any], ProductsCartUser.OPTIONAL);
      if(product) {
        productsInCart.push(product);
      }
    }

    return { user, productsInCart };
  }

  public static async addCart({ cpf, productId }: any): Promise<any> {
    const { user } = await UserService.getAllCart(cpf);
    const { productsInCart } = user;

    const productExists = productsInCart.find((item: string) => item === productId);
    if (productExists) {
      throw new AppError('Esse produto já foi adicionado no carrinho', httpStatus.CONFLICT)
    }

    await ProductService.getById(productId, ProductsCartUser.REQUIRED);
    productsInCart.push(productId);

    const userUpdated = await UserService.update({ cpf, user: { productsInCart } });
    return userUpdated;
  }

  public static async deleteCart({ cpf, productId }: any): Promise<any> {
    const { user } = await UserService.getAllCart(cpf);

    const productsInCart = user.productsInCart.filter((item: any) => item !== productId);

    const userUpdated = await UserService.update({ cpf, user: { productsInCart } });
    return userUpdated;
  }

  public static async deleteAllCart(cpf: string): Promise<UserInterface> {
    const userUpdated = await UserService.update({ cpf, user: { productsInCart: [] } as any });
    return userUpdated;
  }

  public static async deleteAllCartByProductId(id: string): Promise<void> {
    const users = await UserService.getAll();
    
    users.forEach(async (item: UserInterface) => {
      const productsInCart = item.productsInCart?.filter((p: any) => p !== id);
      await UserService.update({ cpf: item.cpf, user: { productsInCart } as any });
    });
  }
}