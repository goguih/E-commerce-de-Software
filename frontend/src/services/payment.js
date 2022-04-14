import instance from '../services/api';
import paymentRoutes from '../constants/routes/paymentRoutes';
import LocalStorage from '../LocalStorage';

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

// payment
export async function getUserPayments(cpf) {
  updateHeader();
  
  const response = await instance.get(paymentRoutes.getUserPayments.url + `/${cpf}`, { headers: header });
  return response.data;
}

export async function create(data) {
  updateHeader();
  
  const response = await instance.post(paymentRoutes.create.url, data, { headers: header });
  return response.data;
}

// card
export async function getCard(data) {
  updateHeader()
  
  const response = await instance.post(paymentRoutes.getCard.url, data, { headers: header });
  return response.data;
}

export async function getCardByNumber(cardNumber) {
  updateHeader();
  
  const response = await instance.get(paymentRoutes.getCardByNumber.url + `/${cardNumber}`, { headers: header });
  return response.data;
}

export async function getUserCards(cpf) {
  updateHeader();
  
  const response = await instance.get(paymentRoutes.getUserCards.url + `/${cpf}`, { headers: header });
  return response.data;
}

export async function addCard(data) {
  updateHeader();
  
  const response = await instance.post(paymentRoutes.addCard.url, data, { headers: header });
  return response.data;
}

export async function deleteCard(cardNumber) {
  updateHeader();
  
  const response = await instance.delete(paymentRoutes.delete.url + `/${cardNumber}`, { headers: header });
  return response.data;
}

// balance
export async function getCardBalance(cardNumber) {
  updateHeader();
  
  const response = await instance.get(paymentRoutes.getCardBalance.url + `/${cardNumber}`);
  return response.data;
}

export async function addCardBalance(data) {
  updateHeader();
  
  const response = await instance.post(paymentRoutes.addCardBalance.url, data);
  return response.data;
}

export async function removeCardBalance(data) {
  updateHeader();
  
  const response = await instance.post(paymentRoutes.removeCardBalance.url, data);
  return response.data;
}