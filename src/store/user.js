import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
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
