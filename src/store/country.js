import { createSlice } from "@reduxjs/toolkit";

export const countrySlice = createSlice({
  name: "country",
  initialState: {
    scrollPosition: 0,
  },
  reducers: {
    updateScrollPosition: (state, { payload }) => {
      state.scrollPosition = payload.currentPosition;
    },
  },
});

export const { updateScrollPosition } = countrySlice.actions;

export default countrySlice.reducer;
