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

type TResponse = {
  status?: number;
  error?: string;
  message?: string;
  data?: object | Array<object>;
}

export interface IUser extends TResponse  { 
  user?: {
    id_user: number;
    user_name: string;
    user_email: string;
    user_permission: string;
    active: string;
  }
  token?: string;
}

export const sessionUser = async function (route: string, body: TSessionUser): Promise<IUser> {
  try {
    const response: IUser = await api.post(route, {
      data: body,
    });
    
    return response;
  } catch (err: any) {
    //TODO: tratar erro

    if (err.response.status === 401) {
      let error = {
        status: err.response.status,
        error: err,
        message: err.response.data.error
      };

      return error;
    }

    return err
  }
};

export const addUser = async function (route: string, body: any, token: string): Promise<IUser> {
  try {
    const response: IUser = await api.post(route, {
      data: body
    }, {
      headers: {
        'Authorization': token
      }
    })

    return response
  }catch(err: any){
    if (err.response.data.status === 409) {
      let error = {
        status: err.response.status,
        error: err,
        message: err.response.data.error
      };

      return error;
    }

    let error: IUser = {
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

  }catch(err: any){

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

export const activateUser = async function (route: string, id_user: number, token: string) {
  try {
    const response = await api.patch(route, {
      data: id_user
    }, {
      headers: {
        'Authorization': token
      }
    })

    return response

  }catch(err: any){

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

export const getAllContacts = async function (route: string, token: string): Promise<Array<IUser>> {
  try {
    const response: Array<IUser> = await api.get(route, {
      headers: {
        'Authorization': token
      }
    })
    return response;
  } catch (err: any) {
    console.log(err)

    return err
  }
};

