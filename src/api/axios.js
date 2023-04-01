import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const axiosPublic = axios.create({ baseURL: BASE_URL });

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
