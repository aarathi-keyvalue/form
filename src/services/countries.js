import { countriesApi } from "./api";

const countryApi = countriesApi.injectEndpoints({
  endpoints: (build) => ({
    getCountryNames: build.query({
      query: () => "all?fields=name",
      transformResponse: (response) =>
        response.map((country) => country.name.common),
    }),
    getCountries: build.query({
      query: () => "all?fields=name,population,region,capital,flags",
    }),
    getCountryByName: build.query({
      query: ({ name }) =>
        `name/${encodeURIComponent(
          name
        )}?fullText=true&fields=name,population,region,capital,flags`,
    }),
  }),
});

export const {
  useGetCountryNamesQuery,
  useGetCountriesQuery,
  useGetCountryByNameQuery,
} = countryApi;
