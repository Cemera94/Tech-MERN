import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    showLoader: false,
  },
  reducers: {
    setShowLoader: (state, action) => {
      state.showLoader = action.payload;
    },
  },
});

export const { setShowLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
