import axios from './axios';

const BASE_URL = process.env.REACT_APP_MENU_SERVICE_URL;

export class MenuAPI {
  static async getMenu() {
    try {
      const response = await axios.get(`${BASE_URL}/menu`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
}
