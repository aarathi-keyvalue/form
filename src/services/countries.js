import { countriesApi } from "./api";

const countryApi = countriesApi.injectEndpoints({
  endpoints: (build) => ({
    countries: build.query({
      query: () => "",
      transformResponse: (response) =>
        response.map((country) => country.name.common),
    }),
  }),
});

export const { useCountriesQuery } = countryApi;
