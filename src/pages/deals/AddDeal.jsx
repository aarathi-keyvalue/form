import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

const AddDeal = () => {
  const {
    register,
    control,
    setValue,
    trigger,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(DealFormSchema),
    defaultValues: {
      //   dealType: "Type 1",
      //   syndicateName: "",
      roundSize: "",
      roundName: "",
      minInvest: "",
      preMoneyValuation: "",
      dealInstrument: "",
      dealRoute: "",
      startDate: "",
      endDate: "",
      //   avgAmtInsight1: "",
      avgAmtInsight2: "",
      email: [{ email: "" }],
      highlights: [{ description: "" }],
      document: [{ name: "", description: "", doc: null }],
      bgImage: null,
      coverImage: null,
    },
  });
  console.log("errror", errors);
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

  const onSubmit = (data) => {
    console.log("deals data", data);
    reset();
  };

  return (
    <div className="w-full h-full">
      <TopBar headerText="" />
      <div className="w-full h-[calc(100vh-93px)] p-4 overflow-y-auto sm:p-8 flex flex-col">
        <div className="text-3xl">Create Deal</div>
        <form className="pt-14" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-x-9">
            <div className="flex flex-col">
              <div className="font-semibold text-lg">Deal Details</div>
              <div className="grid grid-cols-2 gap-x-7 gap-y-7 pt-4">
                <AutoComplete
                  name="dealType"
                  control={control}
                  options={DEAL_TYPE}
                  label="Deal Type"
                  error={errors.dealType}
                />
                <AutoComplete
                  name="syndicateName"
                  control={control}
                  options={DEAL_TYPE}
                  label="Syndicate Name"
                  error={errors.syndicateName}
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
                <Input
                  name="startDate"
                  placeholder="Start Date"
                  register={register}
                  error={errors.startDate}
                />
                <Input
                  name="endDate"
                  placeholder="End Date"
                  register={register}
                  error={errors.endDate}
                />
                <AutoComplete
                  name="avgAmtInsight1"
                  control={control}
                  options={DEAL_TYPE}
                  label="AAI"
                  error={errors.avgAmtInsight1}
                />
                <Input
                  name="avgAmtInsight2"
                  placeholder="Average amount insight"
                  register={register}
                  error={errors.avgAmtInsight2}
                />
              </div>
            </div>
            <div className="flex flex-col">
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
            <div className="grid grid-cols-2 gap-7 w-[569px] pb-5 items-end">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight}
                  className="flex flex-col items-end gap-y-2"
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
                <div className="flex gap-x-7" key={document.name}>
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
                    trigger={trigger}
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
            <div className="flex gap-x-7">
              <FileUploader
                name="bgImage"
                text="Background Image/GIF"
                setValue={setValue}
                trigger={trigger}
                isSubmitted={isSubmitted}
              />
              <FileUploader
                name="coverImage"
                text="Cover Image"
                setValue={setValue}
                trigger={trigger}
                isSubmitted={isSubmitted}
              />
            </div>
          </div>
          <div className="flex gap-x-8 px-24 mt-10 justify-end">
            <Button
              label="SAVE AS DRAFT"
              type="submit"
              buttonStyles="bg-comet/50 text-black py-2 font-medium"
            />
            <Button
              label="NEXT"
              //   type="submit"
              buttonStyles="bg-primaryColor text-white py-2 font-medium"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeal;
