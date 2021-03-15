import axios from 'axios';

export const Api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    common: {
      token: 'S4TWN7LZDnlO',
    }
  }
});