import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "formData",
  initialState: {
    usersList: localStorage.getItem("listedUsers")
      ? JSON.parse(localStorage.getItem("listedUsers"))
      : [],
  },
  reducers: {
    updateFormData: (state, { payload }) => {
      state.usersList.push(payload);
    },
  },
});

export const { updateFormData } = formSlice.actions;

export default formSlice.reducer;
