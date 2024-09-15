import axios from './axios';

const BASE_URL = process.env.REACT_APP_CHEF_SERVICE_URL;

export class ChefAPI {
  static async getPendingOrders() {
    try {
      const response = await axios.get(`${BASE_URL}/chef/pending-orders`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
}
