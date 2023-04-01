import { axiosPublic, axiosPrivate } from './axios';

export const loginKey = '/api/Authentication/login',
  login = async (body) => {
    const response = await axiosPrivate.post(loginKey, body);
    return response.data;
  };

export const registerKey = '/api/Authentication/register',
  register = async (body) => {
    const response = await axiosPublic.post(registerKey, body);
    return response.data;
  };
