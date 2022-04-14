import httpStatus from 'http-status';
import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import { ProductsCartUser } from '../enumerators/productsCartUser';

class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    let response = null;
    
    try {
      response = await ProductService.create(req.body);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    let response = null;
    const { id } = req.params;
    
    try {
      response = await ProductService.getById(id, ProductsCartUser.REQUIRED);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    let response = null;

    try {
      response = await ProductService.getAll();
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getAllWithFilter(req: Request, res: Response): Promise<Response> {
    let response = null;

    try {
      response = await ProductService.getAllWithFilter(req.body);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async deleteById(req: Request, res: Response): Promise<Response> {
    let response = null;
    const { id } = req.params;

    try {
      response = await ProductService.deleteById(id);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }
}

export default new ProductController();