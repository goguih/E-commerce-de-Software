import instance from '../services/api';
import userRoutes from '../constants/routes/userRoutes';
import LocalStorage from '../LocalStorage';
import { ErrorOutline } from '@mui/icons-material';

let token = '';
let header = '';

function updateHeader() {
  token = LocalStorage.getToken();
  header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Authorization": 'Bearer ' + token
  }
}

export async function get(cpf) {
  updateHeader();

  const response = await instance.get(userRoutes.get.url + `/${cpf}`, { headers: header });
  return response.data;
}

export async function getByEmail(email) {
  updateHeader();

  const response = await instance.get(userRoutes.getByEmail.url + email, { headers: header });
  return response.data;
}

export async function create(data) {
  updateHeader();

  const response = await instance.post(userRoutes.create.url, data);
  return response.data;
}

export async function update(cpf, data) {
  updateHeader();

  const response = await instance.patch(userRoutes.update.url + `/${cpf}`, data, { headers: header });
  return response.data;
}

export async function updatePassword(cpf, data) {
  updateHeader();

  const response = await instance.patch(userRoutes.updatePassword.url + `/${cpf}`, data, { headers: header });
  return response.data;
}

export async function deleteUser(cpf, data) {
  updateHeader();

  const response = await instance.delete(userRoutes.deleteUser.url + `/${cpf}`, data, { headers: header });
  return response.data;
}

export async function recoveryPassword(cpf, data) {
  updateHeader();

  const response = await instance.post(userRoutes.recoveryPassword.url + `/${cpf}`, data);
  return response.data;
}

export async function codeVerificationValidate(cpf, data) {
  updateHeader();

  const response = await instance.post(userRoutes.codeVerificationValidate.url, data);
  return response.data;
}

export async function calculateCart(data) {
  updateHeader();

  const response = await instance.post(userRoutes.calculateCart.url, data, { headers: header });
  return response.data;
}

export async function getAllCart(cpf) {
  updateHeader();

  const response = await instance.get(userRoutes.getAllCart.url + `/${cpf}`, { headers: header });
  return response.data;
}

export async function addCart(data) {
  updateHeader();

  let response = null;
  try {
    response = await instance.post(userRoutes.addCart.url, data, { headers: header });
  }
  catch( erro ) {
    console.log("Erro: " + erro);
  }
  return response?.data;
}

export async function deleteCart(data) {
  updateHeader();

  const response = await instance.delete(userRoutes.deleteCart.url, data, { headers: header });
  return response.data;
}

export async function deleteAllCart({ cpf }) {
  updateHeader();

  const response = await instance.delete(`${userRoutes.deleteAllCart.url}/${cpf}`, { headers: header });
  return response.data;
}

export async function getMyShopping(cpf) {
  updateHeader();

  const response = await instance.get(userRoutes.getMyShopping.url + `/${cpf}`, { headers: header });
  return response.data;
}