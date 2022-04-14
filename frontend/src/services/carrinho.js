import instance from '../services/api';
import productRoutes from '../constants/routes/productRoutes';
import LocalStorage from '../LocalStorage';

let token = '';
let header = '';

function updateHeader() {
  token = LocalStorage.getToken()
  header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Authorization": 'Bearer ' + token
  }
}

export async function create(data) {
  updateHeader()
  
  const response = await instance.post(productRoutes.create.url, data, { headers: header });
  return response.data;
}

export async function getAll() {
  updateHeader()
  
  let response = await instance.get(productRoutes.getAll.url, { headers: header });
  return response.data;
}

export async function getAllWithFilter(data) {
  updateHeader()
  
  const response = await instance.post(productRoutes.getAllWithFilter.url, data, { headers: header });
  return response.data;
}