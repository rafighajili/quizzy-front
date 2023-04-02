import { axiosPrivate } from './axios';

const takeKey = '/api/Take';
const takeByIdKey = (id) => `${takeKey}/${id}`;
const openendedKey = (anonymousId) => `${takeKey}/${anonymousId}/openended`;
const givemarkKey = (anonymousId) => `${takeKey}/givemark/${anonymousId}`;

const getTakes = async () => {
  const response = await axiosPrivate.get(takeKey);
  return response.data;
};

const getTakeById = async (id) => {
  const response = await axiosPrivate.get(takeByIdKey(id));
  return response.data;
};

const getOpenended = async (anonymousId) => {
  const response = await axiosPrivate.get(openendedKey(anonymousId));
  return response.data;
};

const postGivemark = async (anonymousId, body) => {
  const response = await axiosPrivate.post(givemarkKey(anonymousId), body);
  return response.data;
};

export { takeKey, takeByIdKey, openendedKey, getTakes, getTakeById, getOpenended, postGivemark };
