import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [],
    isAuthenticated: localStorage.getItem("isAuthenticated"),
  },
  reducers: {
    addUser: (state, { payload }) => {
      state.users.push(payload);
    },
    updateIsAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
  },
});

export const { addUser, updateIsAuthenticated } = usersSlice.actions;

export default usersSlice.reducer;
