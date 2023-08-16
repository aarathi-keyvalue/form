import { createSlice } from "@reduxjs/toolkit";

export const leftNavSlice = createSlice({
  name: "navData",
  initialState: { isNavOpen: false },
  reducers: {
    updateNavOpen: (state, { payload }) => {
      state.isNavOpen = payload;
    },
  },
});

export const { updateNavOpen } = leftNavSlice.actions;

export default leftNavSlice.reducer;
