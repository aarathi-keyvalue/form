import { countriesApi } from "./api";

const countryApi = countriesApi.injectEndpoints({
  endpoints: (build) => ({
    getCountryNames: build.query({
      query: () => "?fields=name",
      transformResponse: (response) =>
        response.map((country) => country.name.common),
    }),
    getCountries: build.query({
      query: () => "?fields=name,flags,population,capital,region",
    }),
  }),
});

export const { useGetCountryNamesQuery, useGetCountriesQuery } = countryApi;
