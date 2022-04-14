import httpStatus from 'http-status';
import { errors } from './../../utilities/status';
import { UserInterface } from '../../interfaces/UserInterface';
import User from '../../models/User';
import AppError from '../../utilities/errors/AppError';
import { UpdateUserInterface } from '../../interfaces/User/UpdateUserInterface';

export default class UserRepository {
  public static async getAll(): Promise<Response | any> {
    let response = null;

    try {
      response = await User.find();
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async getByCPF(cpf: string): Promise<UserInterface> {
    let response = null;

    try {
      response = await User.findOne({ cpf }) as UserInterface;
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async selectOne(options: any): Promise<any> {
    let response = null;

    try {
      response = await User.findOne(options);
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async create({ name, last_name, cpf, email, password, birth_date, phone }: UserInterface): Promise<Response | any> {
    let response = null;

    try {
      response = await User.create({ name, last_name, cpf, email, password, birth_date, phone });
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async update({ cpf, user }: UpdateUserInterface): Promise<Response | any> {
    let response = null;

    try {
      user = {
        ...user,
        updatedAt: Date.now() 
      }
      response = await User.findOneAndUpdate({ cpf }, user as UpdateUserInterface);
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async delete(cpf: string): Promise<Response | any> {
    let response = null;

    try {
      response = await User.deleteOne({ cpf })
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }
}