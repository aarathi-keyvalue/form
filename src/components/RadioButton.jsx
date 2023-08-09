const RadioButton = (props) => {
  const {
    options,
    name,
    register,
    setValue,
    onChangeHandler = () => {},
    error,
  } = props;

  const onChangeClick = (e) => {
    setValue(name, e.target.value);
    onChangeHandler(e);
  };

  return (
    <div className="flex gap-x-5 relative">
      {Object.keys(options).map((label) => (
        <div className="flex items-center gap-x-2" key={options[label]}>
          <input
            type="radio"
            {...register(name)}
            value={options[label]}
            onChange={onChangeClick}
          />
          <label className="font-normal">{label}</label>
        </div>
      ))}
      {error && (
        <span className="absolute -bottom-4 left-2 text-xs text-warningRed">
          {error.message.toString()}
        </span>
      )}
    </div>
  );
};

export default RadioButton;
