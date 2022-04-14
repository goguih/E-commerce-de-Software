import instance from '../services/api';
import sessionRoutes from '../constants/routes/sessionRoutes';
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
  const response = await instance.post(sessionRoutes.create.url, data);
  return response.data;
}

export async function refresh() {
  updateHeader();
  
  let response = await instance.post(sessionRoutes.refresh.url, { token }, { headers: header });
  return response.data;
}