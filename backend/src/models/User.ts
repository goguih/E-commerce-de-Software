import { Schema, model } from 'mongoose';
import { UserInterface } from './../interfaces/UserInterface';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birth_date: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  codeVerification: {
    type: String,
    required: false,
  },
  productsInCart: {
    type: [String],
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

export default model<UserInterface>('User', UserSchema);