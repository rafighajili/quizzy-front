import { axiosPrivate } from './axios';

export const questionsKey = (quizId) => `/api/Quiz/${quizId}/questions`;
export const questionKey = (quizId, questionId) => `${questionsKey(quizId)}/${questionId}`;

export const addQuestion = async (id, body) => {
  const response = await axiosPrivate.post(questionsKey(id), { question: body });
  return response.data;
};

export const getQuestions = async (id) => {
  const response = await axiosPrivate.get(questionsKey(id));
  return response.data;
};

export const editQuestion = async (quizId, questionId, body) => {
  const response = await axiosPrivate.put(questionKey(quizId, questionId), body);
  return response.data;
};

export const deleteQuestion = async (quizId, questionId) => {
  const response = await axiosPrivate.delete(questionKey(quizId, questionId));
  return response.data;
};
