import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './currencySlice';
import authorizationSlice from './authorizationSlice';
import loaderSlice from './loaderSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    currencyStore: currencySlice,
    authorizationStore: authorizationSlice,
    loaderStore: loaderSlice,
    userStore: userSlice,
  },
});

export default store;
