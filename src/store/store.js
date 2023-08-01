import { configureStore } from "@reduxjs/toolkit";

import { countriesApi } from "../services/api";
import formReducer from "./form";
import countryReducer from "./country";

export const store = configureStore({
  reducer: {
    form: formReducer,
    country: countryReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});
