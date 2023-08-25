import { useDispatch } from "react-redux";

import { updateNavOpen } from "../store/leftNav";
import { LeftArrow, HamburgerIcon } from "../assets/icons";
import Button from "./Button";

const TopBar = (props) => {
  const {
    headerText,
    showNavigateBack = false,
    handleBackClick = () => {},
    isButtonRequired = false,
    buttonText = "",
    onButtonClick = () => {},
  } = props;

  const dispatch = useDispatch();

  const handleNavClick = () => {
    dispatch(updateNavOpen(true));
  };

  return (
    <div className="w-full flex justify-between px-2 sm:px-9 py-8 bg-white text-lg font-medium border-b">
      <div
        className={`flex items-center gap-x-2 ${
          isButtonRequired ? "w-1/2" : ""
        }`}
      >
        <div className="cursor-pointer p-2 sm:hidden" onClick={handleNavClick}>
          <HamburgerIcon width={20} height={20} />
        </div>
        {showNavigateBack && (
          <LeftArrow
            className="mr-1 cursor-pointer invisible sm:visible"
            onClick={handleBackClick}
          />
        )}
        {headerText}
      </div>
      {isButtonRequired && (
        <div className="w-fit flex justify-end">
          <Button
            label={buttonText}
            buttonStyles="w-full bg-primaryColor text-white text-xs"
            onClick={onButtonClick}
          />
        </div>
      )}
    </div>
  );
};

export default TopBar;
