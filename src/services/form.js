import { dummyApi } from "./api";

const formApi = dummyApi.injectEndpoints({
  endpoints: (build) => ({
    formSubmit: build.mutation({
      query: ({ data }) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useFormSubmitMutation } = formApi;
