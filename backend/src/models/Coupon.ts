import { Schema, model } from 'mongoose';
import { CouponInterface } from '../interfaces/CouponInterface';

const CouponSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
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

export default model<CouponInterface>('Coupon', CouponSchema);