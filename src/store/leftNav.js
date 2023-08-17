import { createSlice } from "@reduxjs/toolkit";

export const leftNavSlice = createSlice({
  name: "navData",
  initialState: { isNavOpen: false, isNavCollapse: false },
  reducers: {
    updateNavOpen: (state, { payload }) => {
      state.isNavOpen = payload;
    },
    updateNavCollapse: (state, { payload }) => {
      state.isNavCollapse = payload;
    },
  },
});

export const { updateNavOpen, updateNavCollapse } = leftNavSlice.actions;

export default leftNavSlice.reducer;
