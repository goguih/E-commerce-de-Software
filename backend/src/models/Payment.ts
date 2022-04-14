import { Schema, model } from 'mongoose';
import { PaymentInterface } from '../interfaces/PaymentInterface';

const CouponSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  cardId: {
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

export default model<PaymentInterface>('Payment', CouponSchema);