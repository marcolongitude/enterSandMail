import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3333/',
  timeout: 5000,
});

type Tbody = {
  user_email: string;
  password: string;
};

type Terror = {
  status: string;
  error: string;
  message: string;
};

export const sessionUser = async function (route: string, body: Tbody): Promise<object> {
  try {
    const response = await api.post(route, {
      data: body,
    });
    
    return response;
  } catch (err) {

    if (err.response.data.status === 401) {

      let error: Terror = {
        status: err.response.status,
        error: err,
        message: err.response.data.error
      };

      return error;
    }

    let error: Terror = {
      status: err.response.status,
      error: err,
      message: err.response.data.error
    };
    return error;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  sessionUser,
};
