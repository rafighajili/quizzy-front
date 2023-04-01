import { axiosPrivate } from './axios';

export const takeKey = '/api/Take';

export const getTakes = async () => {
  const response = await axiosPrivate.get(takeKey);
  return response.data;
};

export const takeByIdKey = (id) => `${takeKey}/${id}`,
  getTakeById = async (id) => {
    const response = await axiosPrivate.get(takeByIdKey(id));
    return response.data;
  };

export const openendedKey = (id) => `${takeKey}/${id}/openended`,
  getOpenended = async (id) => {
    const response = await axiosPrivate.get(openendedKey(id));
    return response.data;
  };

export const givemarkKey = (id) => `${takeKey}/givemark/${id}`,
  givemark = async (id) => {
    const response = await axiosPrivate.get(givemarkKey(id));
    return response.data;
  };
