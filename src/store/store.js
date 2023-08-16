import { configureStore } from "@reduxjs/toolkit";

import { countriesApi, dummyApi } from "../services/api";
import formReducer from "./form";
import countryReducer from "./country";
import leftNavReducer from "./leftNav";

export const store = configureStore({
  reducer: {
    form: formReducer,
    country: countryReducer,
    leftNav: leftNavReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [dummyApi.reducerPath]: dummyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(countriesApi.middleware)
      .concat(dummyApi.middleware),
});
