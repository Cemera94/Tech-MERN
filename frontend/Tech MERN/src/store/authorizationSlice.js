import { createSlice } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    toggle: false,
  },
  reducers: {
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
    showLoginForm: (state) => {
      state.toggle = false;
    },
    showRegisterForm: (state) => {
      state.toggle = true;
    },
  },
});

export const { setToggle, showLoginForm, showRegisterForm } =
  authorizationSlice.actions;
export default authorizationSlice.reducer;
