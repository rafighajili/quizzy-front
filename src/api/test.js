import { axiosPrivate } from './axios';

export const testKey = '/api/Test';

export const addTest = async (body) => {
  const response = await axiosPrivate.post(testKey, body);
  return response.data;
};

export const testByIdKey = (id) => `${testKey}/${id}`,
  getTest = async (id) => {
    const response = await axiosPrivate.get(testByIdKey(id));
    return response.data;
  };
