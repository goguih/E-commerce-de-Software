import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CouponExistsType } from '../enumerators/couponExistsType';
import CouponService from '../services/CouponService';

class Coupon {
  public async create(req: Request, res: Response): Promise<any> {
    let response = null;

    try {
      response = await CouponService.create(req.body);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getAll(req: Request, res: Response): Promise<any> {
    let response = null;

    try {
      response = await CouponService.getAll();
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getById(req: Request, res: Response): Promise<any> {
    let response = null;
    const { id } = req.params;

    try {
      response = await CouponService.getById(id);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getByName(req: Request, res: Response): Promise<any> {
    let response = null;
    const { name } = req.query;

    try {
      response = await CouponService.getByName(name, CouponExistsType.REQUIRED);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }
}

export default new Coupon();