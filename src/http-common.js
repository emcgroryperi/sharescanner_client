import axios from 'axios';

export const HTTP = axios.create({
  baseURL:  `http://192.168.86.248:9000/api/`
})

