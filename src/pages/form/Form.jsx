/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

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
  TopBar,
} from "../../components";
import { topBarConstants } from "../../constants/common";
import { useFormSubmitMutation } from "../../services/form";
import { addUser, updateUser } from "../../store/form";
import { routes } from "../../routes/routes";
import FormSchema from "./FormValidation";
import FamilyDetailsForm from "./components/FamilyDetailsForm";

const Form = () => {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { usersList } = useSelector((state) => state.form);

  const [countrySearchText, setCountrySearchText] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState();

  let index = 0;
  const defaultValues = {
    name: "",
    degree: "",
    country: "",
    gender: "",
    phoneNumber: "",
    agreeTndC: false,
    declaration: false,
    image: null,
    people: [{ firstName: "", lastName: "", gender: "", age: "" }],
  };

  const getDefaultValue = () => {
    if (!userId) return defaultValues;

    index = usersList?.findIndex((user) => user.createdAt === userId);
    const user = usersList[index];
    const binaryString = atob(user.image.split(",")[1]); // Binary data string
    const blob = new Blob([binaryString], { type: "image/png" }); // Create a BLOB object
    const file = new File([blob], "profile.png", { type: "image/png" });
    return {
      name: user.name,
      degree: user.degree,
      country: user.country,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      agreeTndC: user.agreeTndC,
      declaration: user.declaration,
      image: file,
      people: user.people,
    };
  };

  const {
    register,
    reset,
    watch,
    trigger,
    control,
    setError,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: getDefaultValue(),
  });

  const [image, setImage] = useState({
    preview: "",
    name: "",
  });

  useEffect(() => {
    if (userId) setImage({ preview: usersList[index].image, name: "" });
  }, [index]);

  const { fields, append, remove } = useFieldArray({ name: "people", control });
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
    const reader = new FileReader();
    let imageURL;
    reader.addEventListener("load", () => {
      imageURL = reader.result?.toString() || "";
      if (!userId) {
        const timeStamp = Date.now().toString();
        const finalData = {
          ...data,
          image: imageURL,
          createdAt: timeStamp,
          isActive: true,
        };
        dispatch(addUser(finalData));
        formSubmit({ data: finalData });
        localStorage.setItem(
          "listedUsers",
          JSON.stringify([...usersList, finalData])
        );
      } else {
        const userData = {
          ...data,
          image: imageURL,
          createdAt: userId,
          isActive: true,
        };
        const updatedList = [...usersList];
        updatedList.splice(index, 1, userData);
        dispatch(updateUser(updatedList));
        formSubmit({ data: userData });
        localStorage.setItem("listedUsers", JSON.stringify(updatedList));
      }
    });
    reader.readAsDataURL(data.image);
    setCountrySearchText("");
    index = -1;
    setImage({ preview: "", name: "" });
    reset(defaultValues);
    navigate(routes.USERS);
  };

  return (
    <div className="w-full h-full">
      <TopBar
        headerText={topBarConstants.PERSONAL_FORM}
        showNavigateBack={userId}
        handleBackClick={() => navigate(routes.USERS)}
      />
      <div className="w-full h-[calc(100vh-93px)] flex justify-center p-4 bg-harp overflow-y-auto sm:p-10">
        <div className="w-full min-h-full flex flex-col p-7 bg-white rounded-sm overflow-x-auto sm:rounded-md sm:p-12 sm:shadow-sm sm:h-fit sm:min-w-[700px]">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="flex gap-y-5 sm:gap-x-2 md:gap-x-5 lg:gap-x-10 items-center flex-col-reverse sm:flex-row">
              <div className="flex flex-col gap-y-5 sm:gap-y-10">
                <Input
                  name="name"
                  control={control}
                  placeholder="Name"
                  register={register}
                  error={errors.name}
                />
                <Select
                  options={QUALIFICATIONS}
                  name="degree"
                  control={control}
                  error={errors.degree}
                  register={register}
                />
              </div>
              <div className="flex justify-center w-[270px]">
                <ImageFetcher
                  name="image"
                  register={register}
                  trigger={trigger}
                  isSubmitted={isSubmitted}
                  control={control}
                  setValue={setValue}
                  image={image}
                  setImage={setImage}
                  watch={watch}
                  error={errors.image}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-5 sm:items-start md:items-end mt-5 sm:mt-9 md:gap-x-5 lg:gap-x-10 md:flex-row">
              <div className="flex flex-col gap-y-5 sm:gap-y-10">
                <RadioButton
                  options={GENDER}
                  name="gender"
                  register={register}
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
                  register={register}
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
                register={register}
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
