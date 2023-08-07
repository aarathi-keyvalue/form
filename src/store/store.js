import { configureStore } from "@reduxjs/toolkit";

import { countriesApi, dummyApi } from "../services/api";
import formReducer from "./form";
import countryReducer from "./country";
import usersReducer from "./user";

export const store = configureStore({
  reducer: {
    form: formReducer,
    country: countryReducer,
    users: usersReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [dummyApi.reducerPath]: dummyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countriesApi.middleware)
      .concat(dummyApi.middleware),
});
