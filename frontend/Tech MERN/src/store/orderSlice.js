import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentStep: 1,
  },
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = state.currentStep + action.payload;
    },
    setRestartCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setCurrentStep, setRestartCurrentStep } = orderSlice.actions;
export default orderSlice.reducer;
