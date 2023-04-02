import { axiosPublic, axiosPrivate } from './axios';

const authKey = '/api/Authentication';
const loginKey = `${authKey}/login`;
const registerKey = `${authKey}/register`;

const login = async (body) => {
  const response = await axiosPrivate.post(loginKey, body);
  return response.data;
};

const register = async (body) => {
  const response = await axiosPublic.post(registerKey, body);
  return response.data;
};

export { login, register };
