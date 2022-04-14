import httpStatus from 'http-status';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import sessionRoutes from './routes/sessionRoutes';
import couponRoutes from './routes/couponRoutes';
import paymentRoutes from './routes/paymentRoutes';

import Database from './database/database';
import { errors } from './utilities/status';

export class App {
  private express : express.Application;
  private PORT = process.env.PORT || 3000;

  constructor() {
    this.express = express();
    this.database();
    this.middleware();
    this.errors();
    this.routes();
    this.listen();
  }

  public getApp() : express.Application {
    return this.express;
  }

  private async database() : Promise<void> {
    await Database.connect();
  }

  private middleware() : void {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json());
    this.express.use(cors());
  }

  private errors() : void {
    this.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: errors.INTERNAL_ERROR });
    });
  }

  private routes() : void {
    this.express.use('/product', productRoutes);
    this.express.use('/user', userRoutes);
    this.express.use('/session', sessionRoutes);
    this.express.use('/coupon', couponRoutes);
    this.express.use('/payment', paymentRoutes);
  }

  private listen() : void {
    this.express.listen(this.PORT, () => {
      console.log(`Servidor rodando na porta ${this.PORT}`);
    });
  }
}