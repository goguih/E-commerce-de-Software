export interface UpdateUserInterface {
  cpf: string,

  user: {
    name?: string,
    last_name?: string,
    email?: string,
    password?: string,
    birth_date?: string,
    phone?: string,
    codeVerification?: string,
    updatedAt?: any,
    productsInCart?: [any]
  }
}