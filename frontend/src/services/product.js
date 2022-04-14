import instance from '../services/api';
import productRoutes from '../constants/routes/productRoutes';
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

export async function create(data) {
  try {
    const response = await instance.post(productRoutes.create.url, data, { headers: header });
    return response.data;
  } catch (err) {
    console.log('err: ' + err);
  }
}

export async function getAll() {
  let response = await instance.get(productRoutes.getAll.url, { headers: header });
  return response.data;
}

export async function getAllWithFilter(data) {
  const response = await instance.post(productRoutes.getAllWithFilter.url, data, { headers: header });
  return response.data;
}

export async function getById(id) {
  const response = await instance.get(`${productRoutes.getById.url}/${id}`, { headers: header });
  return response.data;
}