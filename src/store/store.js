import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../appSlice/appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});