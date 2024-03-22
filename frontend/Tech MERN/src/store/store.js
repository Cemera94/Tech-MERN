import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './currencySlice';
import authorizationSlice from './authorizationSlice';

const store = configureStore({
  reducer: {
    currencyStore: currencySlice,
    authorizationStore: authorizationSlice,
  },
});

export default store;
