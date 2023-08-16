import { LeftArrow } from "../assets/icons";
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
  return (
    <div className="w-full flex justify-between px-9 py-8 bg-white text-lg font-medium border-b">
      <div className="flex items-center w-1/2">
        {showNavigateBack && (
          <LeftArrow
            className="mr-3 cursor-pointer"
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
