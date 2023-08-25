/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Controller } from "react-hook-form";

const DropDown = (props) => {
  const {
    name,
    control,
    error,
    setError,
    onChange,
    type = "",
    query,
    clearQuery,
    inputStyle = "",
    placeholder = "",
    endIcon = false,
    setValue,
    getValue,
    icon: Icon = <></>,
    dropdownList = [],
  } = props;

  const [showList, setShowList] = useState(false);
  const inputRef = useRef(null);
  const placeholderRef = useRef(null);

  const openDropdown = useCallback((e) => {
    setShowList(
      e &&
        (e.target === inputRef.current || e.target === placeholderRef.current)
    );
    clearQuery();
  }, []);

  useEffect(() => {
    if (query !== "") setShowList(true);
  }, [query]);

  useEffect(() => {
    document.addEventListener("click", openDropdown);
    return () => document.removeEventListener("click", openDropdown);
  }, [openDropdown]);

  const onListSelect = (selectedItem) => {
    setShowList(false);
    inputRef.current.blur();
    setValue(name, selectedItem);
    if (error) {
      setError(name, "");
    }
    clearQuery();
  };

  const getDisplayValue = () => {
    if (query) {
      return query;
    }
    if (getValue(name)) {
      return getValue(name);
    }
    return "";
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div
          className="relative cursor-text max-w-[270px]"
          onClick={(e) => {
            inputRef.current.focus();
            openDropdown();
          }}
        >
          <input
            ref={inputRef}
            type={type}
            placeholder=" "
            value={getDisplayValue()}
            className={`peer ${
              error
                ? "focus-within:border-warningRed"
                : "focus-within:border-primaryColor"
            } bg-white p-[10px] border border-cloud focus:outline-none rounded-md transition duration-200 ${inputStyle}`}
            onChange={(e) => {
              onChange(e);
              setValue(name, "");
            }}
            onClick={openDropdown}
            autoComplete="off"
          />
          {error && (
            <span className="absolute text-xs text-warningRed -bottom-[18px] left-2">
              {error?.message}
            </span>
          )}
          <span
            ref={placeholderRef}
            className={`transition bg-white duration-200 px-1 absolute top-3 left-2 text-sm sm:text-[15px] text-comet peer-placeholder-shown:text-comet ${
              error
                ? "peer-focus:text-warningRed"
                : "peer-focus:text-primaryColor"
            } input-custom-label ${showList ? "-translate-y-[27px]" : ""}`}
          >
            {placeholder}
          </span>
          {endIcon && !getValue(name) && !showList && (
            <span className="absolute top-[14px] right-3 peer-focus:hidden">
              <Icon />
            </span>
          )}
          {showList && (
            <div className="absolute top-[55px] left-0 border text-sm flex flex-col gap-y-1 h-fit max-h-60 w-[270px] px-4 py-2 overflow-y-auto z-10 bg-white">
              {dropdownList && dropdownList.length > 0 ? (
                dropdownList.map((listItem) => (
                  <div
                    key={listItem}
                    onClick={() => {
                      field.onChange(listItem);
                      onListSelect(listItem);
                    }}
                    className="hover:bg-harp py-1 px-2 rounded-sm cursor-pointer"
                  >
                    {listItem}
                  </div>
                ))
              ) : (
                <div className="text-sm">No results found</div>
              )}
              {}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default DropDown;
