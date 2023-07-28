import { configureStore } from "@reduxjs/toolkit";

import formReducer from "../slice";
import { countriesApi } from "../services/api";

export const store = configureStore({
  reducer: {
    form: formReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});
