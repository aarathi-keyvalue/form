import { Controller } from "react-hook-form";

const RadioButton = ({ options, name, onChangeHandler, control, error }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div className="flex gap-x-5 relative">
          {options.map((option) => (
            <div className="flex items-center gap-x-2" key={option}>
              <input
                type="radio"
                name={name}
                value={option}
                onChange={(e) => {
                  field.onChange(e);
                  onChangeHandler(e);
                }}
              />
              <label>{option}</label>
            </div>
          ))}
          {error && <span className="absolute -bottom-4 left-2 text-xs text-warningRed">{error.message.toString()}</span>}
        </div>
      )}
    />
  );
};

export default RadioButton;
