import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currency: localStorage.currency ? localStorage.currency : 'EUR',
    symbol: '',
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setSymbol: (state, action) => {
      if (state.currency === 'EUR') {
        state.symbol = '€';
      } else if (state.currency === 'USD') {
        state.symbol = '$';
      } else if (state.currency === 'RSD') {
        state.symbol = 'RSD';
      }
    },
  },
});

export const { setCurrency, setSymbol } = currencySlice.actions;
export default currencySlice.reducer;
