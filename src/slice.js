import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "formData",
  initialState: {
    name: "",
    qualification: "",
    gender: "",
    phoneNumber: "",
    image: "",
    country: "",
    tAndCCheck: false,
    declarationCheck: false,
  },
  reducers: {
    updateName: (state, { payload }) => {
      state.name = payload.name;
    },
    updateQualification: (state, { payload }) => {
      state.qualification = payload.qualification;
    },
    updateGender: (state, { payload }) => {
      state.gender = payload.gender;
    },
    updatePhoneNumber: (state, { payload }) => {
      state.phoneNumber = payload.phoneNumber;
    },
    updateCountry: (state, { payload }) => {
      state.country = payload.country;
    },
    updateImage: (state, { payload }) => {
      state.image = payload.image;
    },
    updateTndCCheck: (state, { payload }) => {
      state.tAndCCheck = payload;
    },
    updateDeclaration: (state, { payload }) => {
      state.declarationCheck = payload;
    },
    updateFormData: (state, { payload }) => {
      state = { ...payload };
    },
  },
});

export const {
  updateName,
  updateQualification,
  updateGender,
  updatePhoneNumber,
  updateCountry,
  updateImage,
  updateTndCCheck,
  updateDeclaration,
  updateFormData,
} = formSlice.actions;

export default formSlice.reducer;
