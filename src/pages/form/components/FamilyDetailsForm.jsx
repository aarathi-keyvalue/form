import { useEffect, useState } from "react";

import { DeleteIcon, PlusIcon } from "../../../assets/icons";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { GENDER_SELECT } from "../../../constants/form";

const FamilyDetailsForm = ({
  control,
  error,
  watch,
  setError,
  familyDetails,
  appendHandler,
  removeHandler,
}) => {
  const [isMobile, setMobile] = useState(window.innerWidth < 1024);

  const updateMedia = () => setMobile(window.innerWidth < 1024);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const onAddClick = (index) => {
    const currentItem = watch("people")[index];
    if (
      currentItem.firstName === "" &&
      currentItem.lastName === "" &&
      currentItem.gender === "" &&
      currentItem.age === ""
    ) {
      setError("people", {
        type: "fillBeforeAdd",
        message: "Please fill to continue",
      });
      return;
    }
    if (index === 4) {
      setError("people", {
        type: "limit",
        message: "Unable to add more than 5 people",
      });
      return;
    }
    appendHandler({});
  };

  const onRemoveClick = (index) => {
    removeHandler(index);
  };

  const clearErrorOnChange = () => {
    if (error?.type === "fillBeforeAdd") {
      setError("people", "");
    }
  };

  return (
    <div className="flex flex-col items-start sm:w-full sm:mx-0">
      <div className="text-davyGrey px-[10px] mt-7 font-medium text-sm sm:text-base md:mt-10">
        Family Details
      </div>
      <div className="relative">
        {familyDetails.map((person, index) => (
          <div
            key={person.id}
            className="relative flex items-center w-fit mx-auto h-fit lg:h-[85px] flex-col gap-y-5 mt-5 sm:mx-0 lg:mt-0 lg:flex-row sm:gap-x-2 md:gap-x-5 lg:gap-x-10"
          >
            <Input
              name={`people[${index}].firstName`}
              placeholder="First Name"
              control={control}
              error={error && error[index]?.firstName}
              onChangeFn={clearErrorOnChange}
            />
            <Input
              name={`people[${index}].lastName`}
              placeholder="Last Name"
              control={control}
              error={error && error[index]?.lastName}
              onChangeFn={clearErrorOnChange}
            />
            <div
              className={`flex w-full items-center sm:gap-x-5 md:gap-x-10 ${
                isMobile ? "justify-between" : ""
              }`}
            >
              <Select
                name={`people[${index}].gender`}
                control={control}
                error={error && error[index]?.gender}
                options={GENDER_SELECT}
                onChangeHandler={clearErrorOnChange}
                selectClassName="w-36 sm:w-28"
              />
              <Input
                name={`people[${index}].age`}
                placeholder="Age"
                type="number"
                control={control}
                error={error && error[index]?.age}
                inputClassName="w-28 sm:w-[100px]"
                onChangeFn={clearErrorOnChange}
              />
            </div>

            {isMobile ? (
              <div
                className={`w-full flex ml-2 gap-x-3 ${
                  error && error[index]?.age ? "mt-0" : "-mt-3"
                }`}
              >
                {index === familyDetails.length - 1 && (
                  <div
                    className="cursor-pointer text-xs text-primaryColor"
                    onClick={() => onAddClick(index)}
                  >
                    + Add new
                  </div>
                )}

                {(index !== 0 || familyDetails.length !== 1) && (
                  <div
                    className="cursor-pointer text-xs text-black"
                    onClick={() => onRemoveClick(index)}
                  >
                    Delete
                  </div>
                )}
              </div>
            ) : (
              <div className="cursor-pointer gap-x-2 flex">
                {index === familyDetails.length - 1 ? (
                  <>
                    {index !== 0 && (
                      <DeleteIcon onClick={() => onRemoveClick(index)} />
                    )}
                    <PlusIcon onClick={() => onAddClick(index)} />
                  </>
                ) : (
                  <DeleteIcon onClick={() => onRemoveClick(index)} />
                )}
              </div>
            )}
            {error && index === familyDetails.length - 1 && (
              <span
                className={`absolute left-2 text-xs text-warningRed ${
                  isMobile ? "-top-4" : "bottom-0"
                }`}
              >
                {error?.message}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyDetailsForm;
