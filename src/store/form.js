import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "formData",
  initialState: {
    usersList: localStorage.getItem("listedUsers")
      ? JSON.parse(localStorage.getItem("listedUsers"))
      : [],
  },
  reducers: {
    addUser: (state, { payload }) => {
      state.usersList.push(payload);
    },
    updateUser: (state, { payload }) => {
      state.usersList = payload;
    },
  },
});

export const { addUser, updateUser } = formSlice.actions;

export default formSlice.reducer;
