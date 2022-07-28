import axios from 'axios';

export const HTTP = axios.create({
  // baseURL: `http://192.168.86.50:8000/api/`
  baseURL: 'http://localhost:8000/api/'
//   headers: {
//     Authorization: 'Bearer {token}'
//   }
})