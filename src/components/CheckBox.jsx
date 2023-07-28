const CheckBox = ({
  name,
  register,
  onClick,
  error,
  labelText = "",
}) => {
  return (
    <div className="relative flex gap-x-2 mt-2 items-start">
      <input
        type="checkbox"
        className="mt-[2px] sm:mt-[6px]"
        onClick={onClick}
        {...register(name)}
      />
      <div className="text-comet text-sm sm:text-base">{labelText}</div>
      {error && (
        <span className="text-xs text-warningRed absolute -top-[11px]">
          {error?.message.toString()}
        </span>
      )}
    </div>
  );
};

export default CheckBox;
