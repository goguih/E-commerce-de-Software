import httpStatus from 'http-status';
import { errors } from './../../utilities/status';
import { UserInterface } from "../../interfaces/UserInterface";
import User from "../../models/User";
import AppError from "../../utilities/errors/AppError";

import { UpdateUserInterface } from '../../interfaces/User/UpdateUserInterface';

export default class UserRepository {
  public static async get(cpf: string) : Promise<Response | any> {
    let response = null;

    try {
      response = await User.find({ cpf })
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }
    
    return response;
  }

  public static async create({ name, last_name, cpf, email, password, birth_date, phone } : UserInterface) : Promise<Response | any> {
    let response = null;

    try {
      response = await User.create({ name, last_name, cpf, email, password, birth_date, phone });
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }
    
    return response;
  }

  public static async update({ cpf, user }: UpdateUserInterface) : Promise<Response | any> {
    let response = null;

    try {
      const updatedUser = {
        cpf,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        birth_date: user.birth_date,
        phone: user.phone,
      }

      response = await User.updateOne({ cpf }, updatedUser);
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }
    
    return response;
  }

  public static async delete(cpf: string) : Promise<Response | any> {
    let response = null;

    try {
      response = await User.deleteOne({ cpf })
    } catch (err) {
      throw new AppError(errors.INTERNAL_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
    }
    
    return response;
  }
}