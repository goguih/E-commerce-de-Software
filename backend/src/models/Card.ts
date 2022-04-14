import { Schema, model } from 'mongoose';
import { CardInterface } from '../interfaces/Payment/CardInterface';

const CouponSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  exp_date: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now(),
  }
});

export default model<CardInterface>('Card', CouponSchema);