import { useState } from "react";

import { HideIcon, ShowIcon } from "../assets/icons";

const Input = (props) => {
  const {
    name,
    placeholder,
    register,
    type = "text",
    error = "",
    onChangeFn = () => {},
    inputClassName = "",
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const { onChange } = register(name);

  const onChangeClick = (e) => {
    onChange(e);
    onChangeFn(e);
  };

  const togglePasswordField = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <label className="relative cursor-text h-fit">
      <input
        autoComplete="off"
        type={showPassword ? "text" : type}
        placeholder=" "
        {...register(name)}
        onChange={onChangeClick}
        className={`peer ${
          error
            ? "focus-within:border-warningRed"
            : "focus-within:border-primaryColor"
        } border-cloud p-[10px] border focus:outline-none rounded transition duration-200 h-[54px] ${inputClassName}`}
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
          {showPassword ? <HideIcon /> : <ShowIcon />}
        </div>
      )}
      <span
        className={`bg-white transition duration-200 absolute top-4 left-2 px-1 sm:text-sm text-[15px] text-comet peer-placeholder-shown:text-comet ${
          error ? "peer-focus:text-warningRed" : "peer-focus:text-primaryColor"
        } input-custom-label`}
      >
        {placeholder}
      </span>
    </label>
  );
};

export default Input;
