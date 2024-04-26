import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './currencySlice';
import authorizationSlice from './authorizationSlice';
import loaderSlice from './loaderSlice';
import userSlice from './userSlice';
import dashboardSlice from './dashboardSlice';
import cartSlice from './cartSlice';
import orderSlice from './orderSlice';

const store = configureStore({
  reducer: {
    currencyStore: currencySlice,
    authorizationStore: authorizationSlice,
    loaderStore: loaderSlice,
    userStore: userSlice,
    dashboardStore: dashboardSlice,
    cartStore: cartSlice,
    orderStore: orderSlice,
  },
});

export default store;
