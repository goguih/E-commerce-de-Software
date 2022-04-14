import httpStatus from 'http-status';
import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    let response = null;

    try {
      response = await UserService.getAll();
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async get(req: Request, res: Response): Promise<Response> {
    let response = null;

    const { cpf } = req.params;

    try {
      response = await UserService.getByCPF(cpf);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    if (!response) return res.json({message: 'Usuário não encontrado.' });

    return res.status(httpStatus.OK).json(response);
  }

  public async getByEmail(req: Request, res: Response): Promise<Response> {
    let response = null;

    const { email } = req.params;

    try {
      response = await UserService.getByEmail(email);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    if (!response) return res.json({message: 'Usuário não encontrado.' });

    return res.status(httpStatus.OK).json(response);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    let response = null;

    try {
      response = await UserService.create(req.body);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    let response = null;

    const { cpf } = req.params;
    const user = req.body;

    try {
      response = await UserService.update({ cpf, user });
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async updatePassword(req: Request, res: Response): Promise<Response> {
    let response = null;

    const { cpf } = req.params;
    const { password } = req.body;

    try {
      response = await UserService.updatePassword({ cpf, password });
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    let response = null;

    const { cpf } = req.params;

    try {
      response = await UserService.delete(cpf);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async recoveryPassword(req: Request, res: Response): Promise<Response> {
    let response = null;

    const { email } = req.body;

    try {
      response = await UserService.recoveryPassword({ email });
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async codeVerificationValidate(req: Request, res: Response): Promise<Response> {
    let response = null;

    try {
      response = await UserService.codeVerificationValidate(req.body);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async calculateCart(req: Request, res: Response): Promise<Response> {
    let response = null;

    try {
      response = await UserService.calculateCart(req.body);
    } catch({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getAllCart(req: Request, res: Response): Promise<Response> {
    let response = null;
    const { cpf } = req.params;

    try {
      response = await UserService.getAllCart(cpf);
    } catch({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }
  
  public async addCart(req: Request, res: Response): Promise<Response> {
    let response = null;

    try {
      response = await UserService.addCart(req.body);
    } catch({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async deleteCart(req: Request, res: Response): Promise<Response> {
    let response = null;

    try {
      response = await UserService.deleteCart(req.body);
    } catch({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async deleteAllCart(req: Request, res: Response): Promise<Response> {
    let response = null;
    const { cpf } = req.params;

    try {
      response = await UserService.deleteAllCart(cpf);
    } catch({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }
}

export default new UserController();