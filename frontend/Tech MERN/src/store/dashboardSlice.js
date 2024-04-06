import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    isDashboardView: false,
  },
  reducers: {
    setDashboardView: (state, action) => {
      state.isDashboardView = action.payload;
    },
  },
});

export const { setDashboardView } = dashboardSlice.actions;
export default dashboardSlice.reducer;
