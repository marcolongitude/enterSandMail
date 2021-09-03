import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3333/',
  timeout: 5000,
});

type TSessionUser = {
  user_email: string;
  password: string;
};

type Terror = {
  status: string;
  error: string;
  message: string;
};

export const sessionUser = async function (route: string, body: TSessionUser): Promise<object> {
  try {
    const response = await api.post(route, {
      data: body,
    });
    
    return response;
  } catch (err) {
    //TODO: tratar erro
    console.log(err)

    return err
  }
};

export const addUser = async function (route: string, body: any, token: string) {
  try {
    const response = await api.post(route, {
      data: body
    }, {
      headers: {
        'Authorization': token
      }
    })

    return response
  }catch(err){
    if (err.response.data.status === 409) {
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
}

export const removeUser = async function (route: string, id_user: number, token: string) {
  try {
    const response = await api.patch(route, {
      data: id_user
    }, {
      headers: {
        'Authorization': token
      }
    })

    return response

  }catch(err){

    if (err.response.status === 409) {
      let error: Terror = {
        status: err.response.status,
        error: err,
        message: err.response.data.error.cause
      };

      return error;
    }
  }
}

export const dataContactsUpload = async function (route: string, body: Array<object>, token: string) {
  try {
    const response = await api.post(route, {
      data: body
    }, {
      headers: {
        'Authorization': token
      }
    })

    return response;
  } catch (err) {
    //TODO: tratar erros
    console.log(err)
  }
};

export const getAllContacts = async function (route: string, token: string) {
  try {
    const response = await api.get(route, {
      headers: {
        'Authorization': token
      }
    })
    return response;
  } catch (err) {
    console.log(err)
  }
};

