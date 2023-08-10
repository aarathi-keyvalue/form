import { Controller } from "react-hook-form";

const TextArea = (props) => {
  const { name, placeholder, control, error, onChangeFn = () => {} } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <label className="relative">
          <textarea
            placeholder={placeholder}
            className={`p-[10px] border border-cloud rounded-md focus:outline-none w-full max-w-[270px] ${
              error
                ? "focus-within:border-warningRed"
                : "focus-within:border-primaryColor"
            } placeholder:text-sm py-1`}
            onChange={(e) => {
              field.onChange(e);
              onChangeFn(e);
            }}
          />
          {error && (
            <span className="absolute -bottom-3 left-2 text-xs text-warningRed">
              {error.message}
            </span>
          )}
        </label>
      )}
    />
  );
};

export default TextArea;
