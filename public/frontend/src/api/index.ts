import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3333/',
  timeout: 5000,
});

type Tbody = {
  user_email: string;
  password: string;
};

export const sessionUser = async function (route: string, body: Tbody) {
  try {
    const response = await api.post(route, {
      data: body,
    });

    return response;
  } catch (err) {
    type Terror = {
      status: string;
      error: string;
      message: string;
      data?: any;
    };

    if (err.response.data.status === 401) {
      let error: Terror = {
        status: err.response.status,
        error: err,
        message: 'Erro no sistema',
      };
      return error;
    }

    let error: Terror = {
      status: err.response.status,
      error: err,
      message: 'Erro no sistema',
    };
    return error;
  }
};

export default {
  sessionUser,
};
