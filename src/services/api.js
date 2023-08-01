import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countriesApi = createApi({
  reducerPath: "countryReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://restcountries.com/v3.1",
    timeout: 10000,
  }),
  endpoints: () => ({}),
});
