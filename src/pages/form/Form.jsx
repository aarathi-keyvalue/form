import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";

import { useGetCountryNamesQuery } from "../../services/countries";
import { SearchIcon } from "../../assets/icons";
import { GENDER, QUALIFICATIONS } from "../../constants/form";
import {
  Button,
  CheckBox,
  DropDown,
  ImageFetcher,
  Input,
  RadioButton,
  Select,
} from "../../components";
import { topBarConstants } from "../../constants/common";
import { useFormSubmitMutation } from "../../services/form";
import FormSchema from "./FormValidation";
import FamilyDetailsForm from "./components/FamilyDetailsForm";
import TopBar from "../../components/TopBar";

const Form = () => {
  const {
    register,
    reset,
    watch,
    control,
    setError,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: "",
      degree: "",
      country: "",
      gender: "",
      phoneNumber: "",
      agreeTndC: false,
      declaration: false,
      image: "",
      people: [{ firstName: "", lastName: "", gender: "", age: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({ name: "people", control });

  const [countrySearchText, setCountrySearchText] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [image, setImage] = useState();
  const [isSubmitEnabled, setIsSubmitEnabled] = useState();

  const watchCheckbox = watch(["agreeTndC", "declaration"]);

  const { data: countries } = useGetCountryNamesQuery();
  const [formSubmit] = useFormSubmitMutation();

  useEffect(() => {
    const filteredCountries =
      countries && countrySearchText === ""
        ? countries
        : countries?.filter((country) =>
            country.toLowerCase().includes(countrySearchText.toLowerCase())
          );
    const sortedCountries = filteredCountries
      ? [...filteredCountries].sort()
      : [];
    setCountryList(sortedCountries);
  }, [countrySearchText, countries]);

  useEffect(() => {
    setIsSubmitEnabled(watchCheckbox[0] && watchCheckbox[1]);
  }, [watchCheckbox]);

  const onSearchCountry = (e) => {
    setCountrySearchText(e.target.value);
  };

  const handleFormSubmit = (data) => {
    formSubmit({ data });
    setCountrySearchText("");
    setImage("");
    reset();
  };

  return (
    <div className="w-full h-full">
      <TopBar headerText={topBarConstants.PERSONAL_DETAILS} />
      <div className="w-full h-[calc(100vh-93px)] flex justify-center p-4 bg-harp overflow-y-auto sm:p-10">
        <div className="w-full h-fit flex flex-col p-7 bg-white rounded-sm overflow-x-auto sm:rounded-md sm:p-12 sm:shadow-md sm:h-fit sm:min-w-[700px]">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="flex gap-y-5 sm:gap-x-2 md:gap-x-5 lg:gap-x-10 items-center flex-col-reverse sm:flex-row">
              <div className="flex flex-col gap-y-5 sm:gap-y-10">
                <Input
                  name="name"
                  type="text"
                  control={control}
                  placeholder="Name"
                  error={errors.name}
                  required={true}
                />
                <Select
                  options={QUALIFICATIONS}
                  name="degree"
                  control={control}
                  error={errors.degree}
                />
              </div>
              <div className="flex justify-center w-[270px]">
                <ImageFetcher
                  name="image"
                  register={register}
                  control={control}
                  setValue={setValue}
                  image={image}
                  setImage={setImage}
                  error={errors.image}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-5 sm:items-start md:items-end mt-5 sm:mt-9 md:gap-x-5 lg:gap-x-10 md:flex-row">
              <div className="flex flex-col gap-y-5 sm:gap-y-10">
                <RadioButton
                  options={GENDER}
                  name="gender"
                  control={control}
                  error={errors.gender}
                />
                <DropDown
                  name="country"
                  control={control}
                  error={errors.country}
                  setError={setError}
                  query={countrySearchText}
                  clearQuery={() => setCountrySearchText("")}
                  onChange={onSearchCountry}
                  setValue={setValue}
                  getValue={getValues}
                  inputStyle="w-fit"
                  placeholder="Country"
                  endIcon
                  icon={SearchIcon}
                  dropdownList={countryList}
                />
              </div>
              <div className="flex justify-center">
                <Input
                  name="phoneNumber"
                  type="number"
                  inputClassName=""
                  control={control}
                  placeholder="Phone Number"
                  error={errors.phoneNumber}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <FamilyDetailsForm
                control={control}
                watch={watch}
                error={errors.people}
                familyDetails={fields}
                setError={setError}
                appendHandler={append}
                removeHandler={remove}
              />
            </div>
            <div className="flex gap-x-2 mt-10">
              <CheckBox
                name="agreeTndC"
                register={register}
                error={errors.agreeTndC}
                labelText="I agree to the Terms and Conditions."
              />
            </div>
            <div className="flex items-start gap-x-2 sm:mt-6">
              <CheckBox
                name="declaration"
                register={register}
                error={errors.declaration}
                labelText="I, hereby, declare that the particulars given above are correct
                and complete."
              />
            </div>
            <div className="mt-8 flex justify-center gap-x-5 sm:gap-x-5 sm:justify-start">
              <Button
                label="Clear"
                type="reset"
                buttonStyles="bg-comet/50 text-white"
                onClick={() => {
                  reset();
                }}
              />
              <Button
                label="Submit"
                type="submit"
                disable={!isSubmitEnabled}
                buttonStyles="bg-primaryColor text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
