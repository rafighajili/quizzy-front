import { axiosPrivate } from './axios';

export const getQuizzesKey = '/api/Quiz',
  getQuizzes = async () => {
    const response = await axiosPrivate.get(getQuizzesKey);
    return response.data;
  };

export const addQuizKey = '/api/Quiz',
  addQuiz = async (body) => {
    const response = await axiosPrivate.post(addQuizKey, body);
    return response.data;
  };
