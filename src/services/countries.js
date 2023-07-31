import { countriesApi } from "./api";

const countryApi = countriesApi.injectEndpoints({
  endpoints: (build) => ({
    getCountryNames: build.query({
      query: () => "?fields=name",
      transformResponse: (response) =>
        response.map((country) => country.name.common),
    }),
    getCountries: build.query({
      query: () => "",
    }),
  }),
});

export const { useGetCountryNamesQuery, useGetCountriesQuery } = countryApi;
