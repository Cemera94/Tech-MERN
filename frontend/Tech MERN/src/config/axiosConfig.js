import axios from 'axios';
import { getToken } from '../utils/getToken';

axios.defaults.baseURL = 'https://backendtech-mern.onrender.com';

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
