import httpStatus from 'http-status';
import PaymentRepository from '../database/repositories/PaymentRepository';
import UserRepository from '../database/repositories/UserRepository';
import { CardInterface } from '../interfaces/Payment/CardInterface';
import { GetCardInterface } from '../interfaces/Payment/GetCardInterface';
import { GetUpdateCardInterface } from '../interfaces/Payment/GetUpdateCardInterface';
import { UpdateCardInterface } from '../interfaces/Payment/UpdateCardInterface';
import { PaymentInterface } from '../interfaces/PaymentInterface';
import { UserInterface } from '../interfaces/UserInterface';
import AppError from '../utilities/errors/AppError';
import { errors } from '../utilities/status';

import UserService from './UserService'

export default class CouponService {
  public static async getAll(): Promise<PaymentInterface[]> {

    const allPayments = await PaymentRepository.getAll();
    return allPayments;
  }

  public static async getUserPayments(cpf: string): Promise<PaymentInterface[]> {
    const userFound = await UserService.getByCPF(cpf);

    if (!userFound) {
      throw new AppError(errors.NOT_FOUND, httpStatus.NOT_FOUND);
    }

    const allPayments = await PaymentRepository.getUserPayments(cpf);
    return allPayments;
  }

  public static async create(cpf: string, cardNumber: string, total: number): Promise<any> {
    const userFound = await UserService.getByCPF(cpf);

    if (!userFound) {
      throw new AppError(errors.NOT_FOUND, httpStatus.NOT_FOUND);
    }

    const cardFound = await this.getCardByNumber(cardNumber);

    if (!cardFound) {
      throw new AppError(errors.NOT_FOUND, httpStatus.NOT_FOUND);
    }

    const { value } = await this.getCardBalance(cardFound.number)

    if (total > value) {
      throw new AppError('Valor no cartão insuficiente para realizar a compra!', httpStatus.FORBIDDEN);
    }

    // TODO, descomentar quando tiver a função que adiciona os itens do carrinho na conta da pessoa
    // await this.removeCardBalance(cardNumber, total); // remove o dinheiro da compra da conta da pessoa
    // função que adiciona os itens do carrinho na conta da pessoa
    // await UserService.deleteAllCart(cpf); // função que remove todos os produtos do carrinho

    return { message: 'Compra realizada com sucesso!' };
  }

  public static async getAllCards(): Promise<CardInterface[]> {
    const cardsFound = await PaymentRepository.getAllCards();

    return cardsFound;
  }

  public static async getCard(cardInfo: GetCardInterface): Promise<CardInterface> {
    const cardFound = await PaymentRepository.getCard(cardInfo);

    if (!cardFound) {
      throw new AppError(errors.NOT_FOUND, httpStatus.NOT_FOUND);
    }

    return cardFound;
  }

  public static async getCardByNumber(cardNumber: string): Promise<CardInterface> {
    const cardFound = await PaymentRepository.getCardByNumber(cardNumber);

    if (!cardFound) {
      throw new AppError(errors.NOT_FOUND, httpStatus.NOT_FOUND);
    }

    return cardFound;
  }

  public static async getUserCards(cpf: string): Promise<CardInterface[]> {
    let userFound = await UserService.getByCPF(cpf);

    if (!userFound) {
      throw new AppError(errors.NOT_FOUND, httpStatus.NOT_FOUND);
    }

    const allCards = await PaymentRepository.getUserCards(cpf)

    return allCards;
  }

  public static async addCard(cardInfo: CardInterface): Promise<CardInterface> {
    const cardNumberFound = await this.getCardByNumber(cardInfo.number);

    if (cardNumberFound && cardInfo.number == cardNumberFound.number) {
      throw new AppError('Esse cartão já está adicionado na sua conta.', httpStatus.BAD_REQUEST);
    }

    const cardCreated = await PaymentRepository.addCard(cardInfo);

    return cardCreated;
  }

  public static async getCardBalance(cardNumber: string): Promise<any> {
    const cardFound = await PaymentRepository.getCardByNumber(cardNumber);

    if (!cardFound) {
      throw new AppError(errors.NOT_FOUND, httpStatus.NOT_FOUND);
    }

    return { value: cardFound.value };
  }

  public static async addCardBalance(cardNumber: string, value: number): Promise<any> {
    const cardFound = await PaymentRepository.getCardByNumber(cardNumber);

    if (!cardFound) {
      throw new AppError(errors.NOT_FOUND, httpStatus.NOT_FOUND);
    }

    const newValue = cardFound.value + value

    const cardUpdated = await PaymentRepository.updateCard(cardNumber, { value: newValue });

    return cardUpdated;
  }

  public static async removeCardBalance(cardNumber: string, value: number): Promise<UpdateCardInterface> {
    const cardFound = await PaymentRepository.getCardByNumber(cardNumber);

    if (!cardFound) {
      throw new AppError(errors.BAD_REQUEST, httpStatus.BAD_REQUEST);
    }

    const newValue = cardFound.value - value

    if (newValue < 0) {
      throw new AppError('Não há saldo para a retirada!', httpStatus.BAD_REQUEST);
    }

    const cardUpdated = await PaymentRepository.updateCard(cardNumber, { value: newValue });

    return cardUpdated;
  }

  public static async deleteCard(cardNumber: string): Promise<UpdateCardInterface> {
    const cardFound = await PaymentRepository.getCardByNumber(cardNumber);
    if (!cardFound) {
      throw new AppError(errors.NOT_FOUND, httpStatus.NOT_FOUND);
    }

    const cardDeleted = await PaymentRepository.deleteCard(cardNumber);

    return cardDeleted;
  }
}