import { Controller } from "react-hook-form";
import { useState } from "react";

import { HideIcon, ShowIcon } from "../assets/icons";

const Input = (props) => {
  const {
    name,
    placeholder,
    type = "text",
    control,
    error = "",
    onChangeFn = () => {},
    inputClassName = "",
  } = props;

  const [inputType, setInputType] = useState(type);

  const togglePasswordField = () => {
    if (inputType === "password") {
      setInputType("text");
      return;
    }
    setInputType("password");
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label className="relative cursor-text sm:max-w-[270px]">
          <input
            type={inputType}
            value={field.value}
            placeholder=" "
            onChange={(e) => {
              field.onChange(e);
              onChangeFn(e);
            }}
            className={`peer ${
              error
                ? "focus-within:border-warningRed"
                : "focus-within:border-primaryColor"
            } border-cloud p-[10px] border focus:outline-none rounded-md transition duration-200 ${inputClassName}`}
          />
          {error && (
            <span className="absolute text-xs text-warningRed -bottom-[18px] left-2 -mt-1">
              {error?.message.toString()}
            </span>
          )}
          {type === "password" && (
            <div
              className="absolute top-[18px] right-3 cursor-pointer"
              onClick={togglePasswordField}
            >
              {inputType === "password" ? <ShowIcon /> : <HideIcon />}
            </div>
          )}
          <span
            className={`bg-white transition duration-200 absolute top-3 left-2 px-1 text-sm sm:text-[15px] text-comet peer-placeholder-shown:text-comet ${
              error
                ? "peer-focus:text-warningRed"
                : "peer-focus:text-primaryColor"
            } input-custom-label`}
          >
            {placeholder}
          </span>
        </label>
      )}
    />
  );
};

export default Input;
