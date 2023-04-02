import { axiosPrivate } from './axios';

const testKey = '/api/Test';
const testByIdKey = (id) => `${testKey}/${id}`;
const takesKey = (id) => `${testKey}/${id}/takes`;
const submitKey = `${testKey}/submit`;

const getTestById = async (id) => {
  const response = await axiosPrivate.get(testByIdKey(id));
  return response.data;
};

const addTest = async (body) => {
  const response = await axiosPrivate.post(testKey, body);
  return response.data;
};

const getTakes = async (id, params) => {
  const response = await axiosPrivate.get(takesKey(id), { params });
  return response.data;
};

const submitTest = async (body) => {
  const response = await axiosPrivate.post(submitKey, body);
  return response.data;
};

export { testByIdKey, takesKey, getTestById, addTest, getTakes, submitTest };
