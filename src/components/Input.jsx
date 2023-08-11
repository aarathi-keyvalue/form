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

  const { onChange } = register(name);

  const onChangeClick = (e) => {
    onChange(e);
    onChangeFn(e);
  };

  return (
    <label className="relative cursor-text sm:max-w-[270px]">
      <input
        autoComplete="off"
        type={type}
        placeholder=" "
        {...register(name)}
        onChange={onChangeClick}
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
      <span
        className={`bg-white transition duration-200 absolute top-3 left-2 px-1 text-sm sm:text-[15px] text-comet peer-placeholder-shown:text-comet ${
          error ? "peer-focus:text-warningRed" : "peer-focus:text-primaryColor"
        } input-custom-label`}
      >
        {placeholder}
      </span>
    </label>
  );
};

export default Input;
