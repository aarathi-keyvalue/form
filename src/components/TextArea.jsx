const TextArea = (props) => {
  const { name, placeholder, error, register, onChangeFn = () => {} } = props;

  const { onChange } = register(name);

  const onChangeClick = (e) => {
    onChange(e);
    onChangeFn(e);
  };

  return (
    <label className="relative">
      <textarea
        placeholder={placeholder}
        className={`p-[10px] border border-cloud rounded-md focus:outline-none w-full max-w-[270px] ${
          error
            ? "focus-within:border-warningRed"
            : "focus-within:border-primaryColor"
        } placeholder:text-sm py-1`}
        onChange={onChangeClick}
        {...register(name)}
      />
      {error && (
        <span className="absolute -bottom-3 left-2 text-xs text-warningRed">
          {error.message}
        </span>
      )}
    </label>
  );
};

export default TextArea;
