import { axiosPrivate } from './axios';

const quizKey = '/api/Quiz';
const questionKey = (id) => `${quizKey}/${id}/questions`;
const questionByIdKey = (id, questionId) => `${questionKey(id)}/${questionId}`;

const getQuizzes = async () => {
  const response = await axiosPrivate.get(quizKey);
  return response.data;
};

const addQuiz = async (body) => {
  const response = await axiosPrivate.post(quizKey, body);
  return response.data;
};

const getQuestions = async (id) => {
  const response = await axiosPrivate.get(questionKey(id));
  return response.data;
};

const addQuestion = async (id, body) => {
  const response = await axiosPrivate.post(questionKey(id), { question: body });
  return response.data;
};

const getQuestionById = async (id, questionId) => {
  const response = await axiosPrivate.get(questionByIdKey(id, questionId));
  return response.data;
};

const editQuestion = async (id, questionId, body) => {
  const response = await axiosPrivate.put(questionByIdKey(id, questionId), body);
  return response.data;
};

const deleteQuestion = async (id, questionId) => {
  const response = await axiosPrivate.delete(questionByIdKey(id, questionId));
  return response.data;
};

export { quizKey, questionKey, questionByIdKey, getQuizzes, addQuiz, getQuestions, addQuestion, getQuestionById, editQuestion, deleteQuestion };
