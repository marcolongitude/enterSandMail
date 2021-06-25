import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../..';

export const initialState = {
  currentUser: '',
  tokenData: '',
};

// Slice

const sliceUser = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginUser(state, action: PayloadAction<string>) {
      let payload: any = action.payload;

      state.currentUser = payload.user.user_email;
      state.tokenData = payload.token;
    },
    setCreateUser(state, action: PayloadAction<string>) {
      state.currentUser = action.payload;
    },
    logoutSuccess(state) {
      state.currentUser = '';
      state.tokenData = '';
    },
  },
});

// Actions

const {setLoginUser, logoutSuccess} = sliceUser.actions;

export const loginUser = (data: any) => async (dispatch: AppDispatch) => {
  dispatch(setLoginUser(data));
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(logoutSuccess());
  } catch (e) {
    console.error(e.message);
  }
};

export default sliceUser.reducer;
