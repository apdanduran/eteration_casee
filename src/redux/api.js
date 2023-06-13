import axios from 'axios';
import { baseURL } from '../util/globalVariable';

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = () => {
  return apiClient.get('/products');
};

export const getProduct = (id) => {
  return apiClient.get(`/products/${id}`);
};
