import httpStatus from 'http-status';
import { errors } from './../utilities/status';
import { ProductInterface } from './../interfaces/ProductInterface';
import ProductRepository from "../database/repositories/ProductRepository";
import AppError from '../utilities/errors/AppError';
import CategoryProductFilters from '../interfaces/Product/CategoryProductFilters';
import { ProductsCartUser } from '../enumerators/productsCartUser';
import UserService from './UserService';

export default class ProductService {
  public static async create({ name, description, price, category, licenseType }: ProductInterface): Promise<ProductInterface> {
    if (name.length < 5 || description.length < 10) {
      throw new AppError(errors.BAD_REQUEST, httpStatus.BAD_REQUEST);
    }

    if (price <= 0.00) {
      throw new AppError(errors.BAD_REQUEST, httpStatus.BAD_REQUEST);
    }

    const productCreated = await ProductRepository.create({
      name, 
      description, 
      price, 
      category, 
      licenseType, 
    });
    
    return productCreated;
  }

  public static async getById(id: any, productsCartUser: number): Promise<any> {
    const product = await ProductRepository.selectOne({ _id: id });

    if (productsCartUser === ProductsCartUser.REQUIRED) {
      if (!product) {
        throw new AppError('Produto não foi encontrado', httpStatus.NOT_FOUND);
      }
    }

    return product;
  }

  public static async getAll(): Promise<any> {
    const products = await ProductRepository.selectAll();
    return products;
  }

  public static async getAllWithFilter(filter: CategoryProductFilters): Promise<ProductInterface> {
    const products = await ProductRepository.selectAllWithFilter(filter);
    return products;
  }

  public static async deleteById(id: string): Promise<any> {
    await ProductService.getById(id, ProductsCartUser.REQUIRED);
    
    await ProductRepository.deleteById(id);
    await UserService.deleteAllCartByProductId(id);

    return { message: 'Produto removido com sucesso!' };
  }
}