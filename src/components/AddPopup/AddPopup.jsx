import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { DownArrow } from "../../assets/icons";
import Input from "../Input";
import Button from "../Button";
import PopupFormSchema from "./PopupFormValidation";
import TextArea from "../TextArea";

const AddPopup = (props) => {
  const { onClick, isOpen } = props;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PopupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      title: "",
      desc: "",
    },
  });

  const handleFormSubmit = (data) => {
    console.log("submitted data:", data);
    reset();
  };

  return (
    <div
      className={`absolute bottom-3 right-7 bg-white z-10 p-3 border shadow-lg rounded-lg ${
        isOpen ? "animate-slide-to-top" : "animate-slide-to-bottom"
      }`}
    >
      <div className="relative">
        <div
          className="absolute -top-14 right-0 bg-primaryColor h-8 w-8 flex items-center justify-center rounded-full cursor-pointer"
          onClick={onClick}
        >
          <DownArrow fill="white" />
        </div>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="p-3 flex flex-col gap-y-7">
          <Input
            name="name"
            placeholder="Name"
            register={register}
            error={errors?.["name"]}
          />
          <Input
            name="email"
            placeholder="Email"
            register={register}
            error={errors?.["email"]}
          />
          <Input
            name="phone"
            type="number"
            placeholder="Phone Number"
            register={register}
            error={errors?.["phone"]}
          />
          <Input
            name="title"
            placeholder="Title"
            register={register}
            error={errors?.["title"]}
          />
          <TextArea
            name="desc"
            placeholder="Description"
            register={register}
            error={errors?.["desc"]}
          />
          <Button
            type="submit"
            label="Submit"
            buttonStyles="bg-primaryColor w-full text-white mt-5"
          />
        </div>
      </form>
    </div>
  );
};

export default AddPopup;
