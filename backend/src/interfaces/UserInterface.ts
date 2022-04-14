import { ProductInterface } from "./ProductInterface";

export interface UserInterface {
  _id?: string,
  name: string,
  last_name: string,
  cpf: string,
  email: string,
  password: string,
  birth_date: string,
  phone: string,
  codeVerification?: string,
  productsInCart?: [any]
}