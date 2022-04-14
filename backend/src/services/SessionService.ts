import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import { SessionInterface } from '../interfaces/SessionInterface';
import { CreateSessionInterface } from '../interfaces/Session/CreateSessionInterface';
import UserService from '../services/UserService'

import AppError from '../utilities/errors/AppError'
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class SessionService {
  public static async create(user: CreateSessionInterface): Promise<SessionInterface> {
    const userFound = await UserService.getByEmail(user.email);

    if (!userFound) {
      throw new AppError('Combinação incorreta de e-mail e senha.', 401);
    }

    // user.password -> senha não-criptografada
    // userFound.password -> senha criptografada

    const passwordMatched = await compare(user.password, userFound.password);

    if (!passwordMatched) {
      throw new AppError('Combinação incorreta de e-mail e senha.', 401);
    }

    // usuário autenticado
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userFound.cpf,
      expiresIn,
      // pensar na questão "experiência de usuário X segurança"
      // estratégias de refresh token
    });

    return { token, cpf: userFound.cpf };
  }

  public static async refresh(token: string): Promise<string> {
    let sub = null;
    let decoded = null;

    try {
      decoded = verify(token, authConfig.jwt.secret);
    } catch (error) {
      throw new AppError('Token de autenticação inválido.', 401);
    }

    sub = decoded as TokenPayload;

    return sub.sub;
  }
}