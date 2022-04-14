import httpStatus from 'http-status';
import CouponRepository from '../database/repositories/CouponRepository';
import { CouponExistsType } from '../enumerators/couponExistsType';
import { CouponInterface } from '../interfaces/CouponInterface';
import AppError from '../utilities/errors/AppError';
import { errors } from '../utilities/status';

export default class CouponService {
  public static async create({ name, value }: CouponInterface): Promise<CouponInterface> {
    if (name.length < 5) {
      throw new AppError(errors.BAD_REQUEST, httpStatus.BAD_REQUEST);
    }

    if (value <= 0) {
      throw new AppError(errors.BAD_REQUEST, httpStatus.BAD_REQUEST);
    }
    
    const coupon = await CouponService.getByName(name, CouponExistsType.OPTIONAL);

    if (name === coupon?.name) {
      throw new AppError('Já existe um cupom com esse nome', httpStatus.CONFLICT);
    }

    const couponCreated = await CouponRepository.create({ name, value });
    return couponCreated;
  }

  public static async getAll(): Promise<any> {
    const coupon = await CouponRepository.selectAll();
    return coupon;
  }

  public static async getById(id: any): Promise<CouponInterface> {
    const coupon = await CouponRepository.selectOne({ _id: id });

    if (!coupon) {
      throw new AppError('Cupom não foi encontrado', httpStatus.NOT_FOUND);
    }

    return coupon;
  }

  public static async getByName(name: any, couponExistsType: number): Promise<CouponInterface | null> {
    const coupon = await CouponRepository.selectOne({ name: name as string });
    
    if (couponExistsType === CouponExistsType.REQUIRED && !coupon) {
      throw new AppError('Cupom não foi encontrado', httpStatus.NOT_FOUND);
    }

    if (!coupon) {
      return null;
    }

    return coupon;
  }
}