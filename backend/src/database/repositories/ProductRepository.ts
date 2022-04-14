import httpStatus from 'http-status';
import { errors } from './../../utilities/status';
import { ProductInterface } from '../../interfaces/ProductInterface';
import Product from '../../models/Product';
import AppError from '../../utilities/errors/AppError';

export default class ProductRepository {
  public static async create(product: ProductInterface): Promise<ProductInterface> {
    let response = null;

    try {
      response = await Product.create(product);
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }
    
    return response;
  }

  public static async selectOne(options: any): Promise<Response | any> {
    let response = null;

    try {
      response = await Product.findOne(options);
    } catch (err) {
      console.log(err);
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async selectAll(): Promise<any> {
    let response = null;

    try {
      response = await Product.find();
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async selectAllWithFilter(filter: any): Promise<any> {
    let response = null;

    try {
      response = await Product.find(filter);
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async deleteById(id: string): Promise<any> {
    let response = null;

    try {
      response = await Product.deleteOne({ _id: id });
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }
}