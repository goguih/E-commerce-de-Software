import httpStatus from "http-status";
import { CardInterface } from "../../interfaces/Payment/CardInterface";
import { PaymentInterface } from "../../interfaces/PaymentInterface";
import Payment from "../../models/Payment";
import Card from "../../models/Card";
import AppError from "../../utilities/errors/AppError";
import { errors } from "../../utilities/status";
import { UpdateCardInterface } from "../../interfaces/Payment/UpdateCardInterface";
import { GetUpdateCardInterface } from "../../interfaces/Payment/GetUpdateCardInterface";
import { GetCardInterface } from "../../interfaces/Payment/GetCardInterface";

export default class PaymentRepository {
  public static async getAll(): Promise<PaymentInterface[]> {
    let response = null;

    try {
      response = await Payment.find();
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async getUserPayments(cpf: string): Promise<PaymentInterface[]> {
    let response = null;

    try {
      response = await Payment.find({ cpf });
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async getCard(cardInfo: GetCardInterface): Promise<CardInterface> {
    let cardFound = null;

    try {
      cardFound = await Card.findOne(cardInfo);
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!cardFound) {
      throw new AppError(errors.NOT_FOUND, httpStatus.NOT_FOUND);
    }

    return cardFound;
  }

  public static async getCardByNumber(number: string): Promise<CardInterface> {
    let cardFound = null;

    try {
      cardFound = await Card.findOne({ number });
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!cardFound) {
      throw new AppError(errors.NOT_FOUND, httpStatus.NOT_FOUND);
    }

    return cardFound;
  }

  public static async getUserCards(cpf: string): Promise<CardInterface[]> {
    let cardsFound = null;

    try {
      cardsFound = await Card.find({ cpf });
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return cardsFound;
  }

  public static async getAllCards(): Promise<CardInterface[]> {
    let response = null;

    try {
      response = await Card.find();
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async addCard(cardInfo: CardInterface): Promise<CardInterface> {
    let response = null;
    
    cardInfo.value = 0

    try {
      response = await Card.create(cardInfo);
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return response;
  }

  public static async updateCard(cardNumber: string, updatedCardInfo: UpdateCardInterface): Promise<CardInterface> {
    let updatedCard, card = null;

    try {
      updatedCard = await Card.updateOne({ number: cardNumber }, updatedCardInfo);
      card = await PaymentRepository.getCardByNumber(cardNumber);
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return card;
  }

  public static async deleteCard(number: string): Promise<any> {
    let deletedCard = null;

    try {
      deletedCard = await Card.deleteOne({ number });
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }

    return deletedCard;
  }
}