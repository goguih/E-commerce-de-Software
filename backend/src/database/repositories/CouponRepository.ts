import httpStatus from "http-status";
import { CouponInterface } from "../../interfaces/CouponInterface";
import Coupon from "../../models/Coupon";
import AppError from "../../utilities/errors/AppError";
import { errors } from "../../utilities/status";

export default class CouponRepository {
  public static async create(coupon: CouponInterface) {
    let response = null;

    try {
      response = await Coupon.create(coupon);
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async selectAll(): Promise<any> {
    let response = null;

    try {
      response = await Coupon.find();
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async selectOne(options: any): Promise<any> {
    let response = null;

    try {
      response = await Coupon.findOne(options);
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }
}