import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../utilities/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token JWT

  // pegando o valor do header
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Usuário não está autenticado.', httpStatus.UNAUTHORIZED);
  }

  // formato do valor do header: "Bearer insert_token_here"

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, authConfig.jwt.secret) as TokenPayload;

    return next();
  } catch {
    throw new AppError('Token JWT de autenticação inválido.', 401);
  }
}
