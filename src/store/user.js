import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.users = payload;
    },
    addUser: (state, { payload }) => {
      state.users.push(payload);
    },
    updateIsAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
  },
});

export const { setUser, addUser, updateIsAuthenticated } = usersSlice.actions;

export default usersSlice.reducer;
