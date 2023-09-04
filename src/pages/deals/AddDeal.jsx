import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import {
  AutoComplete,
  Button,
  FileUploader,
  Input,
  TextArea,
  TopBar,
} from "../../components";
import { DEAL_TYPE } from "../../constants/deal";
import { DeleteBlackIcon } from "../../assets/icons";
import { COLORS } from "../../constants/colors";
import AddMore from "./components/AddMore";
import DealFormSchema from "./DealFormValidation";
import CustomDatePicker from "../../components/DatePicker";

const AddDeal = () => {
  const {
    register,
    control,
    setValue,
    watch,
    trigger,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(DealFormSchema),
    defaultValues: {
      dealType: null,
      syndicateName: null,
      roundSize: "",
      roundName: "",
      minInvest: "",
      preMoneyValuation: "",
      dealInstrument: "",
      dealRoute: "",
      startDate: null,
      endDate: null,
      avgAmtInsight1: null,
      avgAmtInsight2: "",
      email: [{ email: "" }],
      highlights: [{ description: "" }],
      document: [{ name: "", description: "", doc: null }],
      bgImage: null,
      coverImage: null,
    },
  });
  const { fields, append } = useFieldArray({ name: "email", control });
  const { fields: docFields, append: addDoc } = useFieldArray({
    name: "document",
    control,
  });
  const {
    fields: highlights,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    name: "highlights",
    control,
  });

  const [dealType, setDealType] = useState(null);
  const [synName, setSynName] = useState(null);
  const [aai, setAai] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onSubmit = (data) => {
    console.log("deals data", data);
    reset();
    setDealType(null);
    setSynName(null);
    setAai(null);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="w-full h-full">
      <TopBar headerText="" />
      <div className="w-full h-[calc(100vh-93px)] p-4 overflow-y-auto sm:p-10 flex flex-col">
        <div className="text-3xl">Create Deal</div>
        <form className="pt-14" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row gap-x-9">
            <div className="flex flex-col">
              <div className="font-semibold text-lg">Deal Details</div>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-7 pt-4">
                <AutoComplete
                  name="dealType"
                  control={control}
                  options={DEAL_TYPE}
                  label="Deal Type"
                  error={errors.dealType}
                  selectedValue={dealType}
                  setSelectedValue={setDealType}
                />
                <AutoComplete
                  name="syndicateName"
                  control={control}
                  options={DEAL_TYPE}
                  label="Syndicate Name"
                  error={errors.syndicateName}
                  selectedValue={synName}
                  setSelectedValue={setSynName}
                />
                <Input
                  name="roundSize"
                  placeholder="Round Size"
                  register={register}
                  error={errors.roundSize}
                />
                <Input
                  name="roundName"
                  placeholder="Round Name"
                  register={register}
                  error={errors.roundName}
                />
                <Input
                  name="minInvest"
                  type="number"
                  placeholder="Min. invest"
                  register={register}
                  error={errors.minInvest}
                />
                <Input
                  name="preMoneyValuation"
                  type="number"
                  placeholder="Pre-money valuation"
                  register={register}
                  error={errors.preMoneyValuation}
                />
                <Input
                  name="dealInstrument"
                  placeholder="Deal Instrument"
                  register={register}
                  error={errors.dealInstrument}
                />
                <Input
                  name="dealRoute"
                  placeholder="Deal Route"
                  register={register}
                  error={errors.dealRoute}
                />
                <CustomDatePicker
                  name="startDate"
                  label="Start Date"
                  control={control}
                  error={errors.startDate}
                  selectedValue={startDate}
                  setSelectedValue={setStartDate}
                />
                <CustomDatePicker
                  name="endDate"
                  label="End Date"
                  control={control}
                  error={errors.endDate}
                  selectedValue={endDate}
                  setSelectedValue={setEndDate}
                />
                <AutoComplete
                  name="avgAmtInsight1"
                  control={control}
                  options={DEAL_TYPE}
                  label="AAI"
                  error={errors.avgAmtInsight1}
                  selectedValue={aai}
                  setSelectedValue={setAai}
                />
                <Input
                  name="avgAmtInsight2"
                  type="number"
                  placeholder="Average amount insight"
                  register={register}
                  error={errors.avgAmtInsight2}
                />
              </div>
            </div>
            <div className="flex flex-col pt-10 sm:pt-0">
              <div className="font-semibold text-lg pb-4">
                Emails for Deal Managers
              </div>
              <div className="flex flex-col gap-y-5">
                {fields.map((email, index) => (
                  <Input
                    key={email.email}
                    name={`email[${index}].email`}
                    placeholder="Email address"
                    register={register}
                    error={errors && errors.email && errors.email[index].email}
                  />
                ))}
                <AddMore
                  text="ADD ANOTHER"
                  onClick={() => append({ email: "" })}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-lg pt-10 pb-4">
              Deal Highlights
            </div>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-x-7 gap-y-6 w-[569px] pb-5 sm:items-end">
              {highlights.map((highlight, index) => (
                <div
                  key={`${highlight}_${index}`}
                  className="w-fit flex flex-col gap-y-2 items-end"
                >
                  {index !== 0 && (
                    <DeleteBlackIcon
                      height={20}
                      width={20}
                      fill={COLORS.DAVY_GREY}
                      className="cursor-pointer"
                      onClick={() => removeHighlight(index)}
                    />
                  )}
                  <TextArea
                    name={`highlights[${index}].description`}
                    placeholder="Description"
                    error={
                      errors.highlights && errors.highlights[index].description
                    }
                    register={register}
                  />
                </div>
              ))}
            </div>
            <AddMore
              text="ADD DEAL HIGHLIGHT"
              onClick={() => appendHighlight({ description: "" })}
            />
          </div>
          <div>
            <div className="font-semibold text-lg pt-10 pb-4">
              Deal Documents
            </div>
            <div className="flex flex-col gap-y-5 pb-5">
              {docFields.map((document, index) => (
                <div
                  className="flex gap-x-7 gap-y-5 flex-col sm:flex-row"
                  key={document.name}
                >
                  <Input
                    name={`document[${index}].name`}
                    placeholder="Document Name"
                    register={register}
                    error={errors.document && errors.document[index].name}
                  />
                  <TextArea
                    name={`document[${index}].description`}
                    placeholder="Description"
                    error={
                      errors.document && errors.document[index].description
                    }
                    register={register}
                  />
                  <FileUploader
                    name={`document[${index}].doc`}
                    text="Upload Document"
                    setValue={setValue}
                    error={errors.document && errors.document[index].doc}
                    trigger={trigger}
                    watch={watch}
                    isSubmitted={isSubmitted}
                  />
                </div>
              ))}
            </div>
            <AddMore
              text="ADD ANOTHER DOCUMENT"
              onClick={() => addDoc({ name: "", description: "", doc: null })}
            />
          </div>
          <div>
            <div className="font-semibold text-lg pt-10 pb-4">
              Deal Visual Assets
            </div>
            <div className="flex gap-x-7 gap-y-5 flex-col sm:flex-row">
              <FileUploader
                name="bgImage"
                text="Background Image/GIF"
                setValue={setValue}
                trigger={trigger}
                error={errors.bgImage}
                watch={watch}
                isSubmitted={isSubmitted}
              />
              <FileUploader
                name="coverImage"
                text="Cover Image"
                setValue={setValue}
                trigger={trigger}
                watch={watch}
                error={errors.coverImage}
                isSubmitted={isSubmitted}
              />
            </div>
          </div>
          <div className="flex gap-x-8 sm:px-24 my-12 justify-end">
            <Button
              label="SAVE AS DRAFT"
              type="submit"
              buttonStyles="bg-comet/50 text-black py-2 font-medium"
            />
            <Button
              label="NEXT"
              buttonStyles="bg-primaryColor text-white py-2 font-medium"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeal;
