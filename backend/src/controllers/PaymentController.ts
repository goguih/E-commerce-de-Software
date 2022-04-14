import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CardInterface } from '../interfaces/Payment/CardInterface';
import { GetCardInterface } from '../interfaces/Payment/GetCardInterface';
import { GetUpdateCardInterface } from '../interfaces/Payment/GetUpdateCardInterface';
import { UpdateCardInterface } from '../interfaces/Payment/UpdateCardInterface';
import PaymentService from '../services/PaymentService';

class Payment {
  public async getAll(req: Request, res: Response): Promise<any> {
    let response = null;

    try {
      response = await PaymentService.getAll();
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getUserPayments(req: Request, res: Response): Promise<any> {
    let response = null;

    const { cpf } = req.params;

    try {
      response = await PaymentService.getUserPayments(cpf);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async create(req: Request, res: Response): Promise<any> {
    let response = null;

    const { cpf, cardNumber, total } = req.body;

    try {
      response = await PaymentService.create(cpf, cardNumber, total);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getAllCards(req: Request, res: Response): Promise<any> {
    let response = null;

    try {
      response = await PaymentService.getAllCards();
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getCard(req: Request, res: Response): Promise<any> {
    let response = null;

    const card: GetCardInterface = req.body;

    try {
      response = await PaymentService.getCard(card);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getCardByNumber(req: Request, res: Response): Promise<any> {
    let response = null;

    const { cardNumber } = req.params;

    try {
      response = await PaymentService.getCardByNumber(cardNumber);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getUserCards(req: Request, res: Response): Promise<any> {
    let response = null;

    const { cpf } = req.params;

    try {
      response = await PaymentService.getUserCards(cpf);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async addCard(req: Request, res: Response): Promise<any> {
    let response = null;

    const { card } = req.body;

    try {
      response = await PaymentService.addCard(card);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async getCardBalance(req: Request, res: Response): Promise<any> {
    let response = null;

    const { cardNumber } = req.params;

    try {
      response = await PaymentService.getCardBalance(cardNumber);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async addCardBalance(req: Request, res: Response): Promise<any> {
    let response = null;

    const { cardNumber, value } = req.body;

    try {
      response = await PaymentService.addCardBalance(cardNumber, value);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async removeCardBalance(req: Request, res: Response): Promise<any> {
    let response = null;

    const { cardNumber, value } = req.body;

    try {
      response = await PaymentService.removeCardBalance(cardNumber, value);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }

  public async deleteCard(req: Request, res: Response): Promise<any> {
    let response = null;

    const { cardNumber } = req.params;

    try {
      response = await PaymentService.deleteCard(cardNumber);
    } catch ({ message, statusCode }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  }
}

export default new Payment();