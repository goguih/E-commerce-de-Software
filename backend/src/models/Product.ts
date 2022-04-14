import { Schema, model } from 'mongoose';
import { ProductInterface } from './../interfaces/ProductInterface';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
  advertiser: {
    type: String,
    required: false,
  },
  licenseType: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: false,
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

export default model<ProductInterface>('Product', ProductSchema);