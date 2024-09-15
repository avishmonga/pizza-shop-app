import axios from './axios';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

axios.interceptors.request.use(
  (config) => {
    let clientId = Cookies.get('clientId');
    if (!clientId) {
      clientId = uuidv4();
      Cookies.set('clientId', clientId, { expires: 7 });
    }
    if (clientId) {
      config.params = config.params || {};
      config.params.clientId = clientId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const BASE_URL = process.env.REACT_APP_ORDER_SERVICE_URL;

export class OrderAPI {
  static async getOrders() {
    try {
      const response = await axios.get(`${BASE_URL}/orders`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
  static async createOrder(data) {
    try {
      const response = await axios.post(`${BASE_URL}/orders`, data);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
}
