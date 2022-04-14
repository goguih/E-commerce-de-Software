import httpStatus from 'http-status';
import { Request, Response } from 'express';
import SessionService from '../services/SessionService';
import AppError from '../utilities/errors/AppError';

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    let response = null;

    try {
      response = await SessionService.create(req.body);

    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async refresh(req: Request, res: Response): Promise<Response> {
    let response = null;

    try {
      const { token } = req.body;

      response = await SessionService.refresh(token);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }
 
    return res.status(httpStatus.OK).json({"cpf": response});
  }
}

export default new SessionController();