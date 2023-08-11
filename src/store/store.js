import { configureStore } from "@reduxjs/toolkit";

import { countriesApi, dummyApi } from "../services/api";
import formReducer from "./form";
import countryReducer from "./country";

export const store = configureStore({
  reducer: {
    form: formReducer,
    country: countryReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [dummyApi.reducerPath]: dummyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(countriesApi.middleware)
      .concat(dummyApi.middleware),
});
