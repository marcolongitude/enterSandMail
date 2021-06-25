import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import userReduce from './slices/userLogin/userLoginSlice';

const middlewares: any[] = [];

const store = configureStore({
  reducer: userReduce,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

//export types

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
