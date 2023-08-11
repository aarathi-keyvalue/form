const Select = ({
  name,
  control,
  error = "",
  options,
  register,
  selectClassName = "w-[270px]",
  onChangeHandler = () => {},
}) => {
  const { onChange } = register(name);

  return (
    <div className="relative border border-cloud rounded-md">
      <select
        className={`focus:outline-none border-r-8 border-transparent text-sm text-davyGrey bg-white py-[13px] px-[7px] h-fit rounded-md sm:max-w-[270px] ${selectClassName}`}
        onChange={(e) => {
          onChange(e);
          onChangeHandler(e);
        }}
        {...register(name)}
      >
        {Object.keys(options).map((label) => (
          <option
            className="text-davyGrey"
            key={options[label]}
            value={options[label]}
          >
            {label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-warningRed absolute -bottom-[18px] left-2">
          {error?.message.toString()}
        </span>
      )}
    </div>
  );
};

export default Select;
