import axios from 'axios';

export const Api = axios.create({
  baseURL: 'https://app-deliverit-backend.herokuapp.com/',
  headers: {
    common: {
      token: 'S4TWN7LZDnlO',
    }
  }
});