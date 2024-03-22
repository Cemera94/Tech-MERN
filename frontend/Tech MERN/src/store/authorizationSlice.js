import { createSlice } from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState: {
    toggle: false,
  },
  reducers: {
    setToggle: (state, action) => {
      console.log(action.payload);
      state.toggle = action.payload;
    },
  },
});

export const { setToggle } = authorizationSlice.actions;
export default authorizationSlice.reducer;
