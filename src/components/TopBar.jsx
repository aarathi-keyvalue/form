import { LeftArrow } from "../assets/icons";

const TopBar = (props) => {
  const {
    headerText,
    showNavigateBack = false,
    handleBackClick = () => {},
  } = props;
  return (
    <div className="w-full px-9 py-8 bg-white text-lg font-medium border-b">
      <div className="flex items-center">
        {showNavigateBack && (
          <LeftArrow
            className="mr-3 cursor-pointer"
            onClick={handleBackClick}
          />
        )}
        {headerText}
      </div>
    </div>
  );
};

export default TopBar;
