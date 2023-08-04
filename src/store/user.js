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
    authenticate: (state) => {
      state.isAuthenticated = true;
    },
  },
});

export const { addUser, authenticate } = usersSlice.actions;

export default usersSlice.reducer;
