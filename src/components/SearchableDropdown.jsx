import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

const SearchableDropdown = ({
  name,
  control,
  placeholder,
  options,
  setValue,
  getValue,
  query,
  clearQuery,
  onChange,
  selectedVal,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    clearQuery();
    setValue(name, option);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (getValue(name)) return getValue(name);

    return "";
  };

  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({field}) => (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            className={`peer focus-within:border-primaryColor bg-harp border-davyGrey p-[10px] border focus:outline-none rounded-md transition duration-200`}
            onChange={(e) => {
              onChange(e);
              setValue(name, "");
            }}
            onClick={toggle}
            autoComplete="off"
          />
          <span className="transition duration-200 absolute top-3 left-2 text-sm text-comet peer-placeholder-shown:text-[#B4B7BD] peer-focus:text-primaryColor input-custom-label">
            {placeholder}
          </span>
          {isOpen && (
            <div className="absolute top-[45px] left-0 w-60 h-fit overflow-y-auto max-h-60 z-10 bg-white gap-y-1 px-4 py-2">
              {options.map((option) => {
                return (
                  <div
                    onClick={() => selectOption(option)}
                    key={option}
                    className="hover:bg-harp cursor-pointer py-1 px-2 rounded-sm"
                  >
                    {option}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default SearchableDropdown;
