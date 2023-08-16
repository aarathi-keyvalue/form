import { useDispatch } from "react-redux";

import { updateNavOpen } from "../store/leftNav";
import { LeftArrow, HamburgerIcon } from "../assets/icons";

const TopBar = (props) => {
  const {
    headerText,
    showNavigateBack = false,
    handleBackClick = () => {},
  } = props;

  const dispatch = useDispatch();

  const handleNavClick = () => {
    dispatch(updateNavOpen(true));
  };

  return (
    <div className="w-full px-2 sm:px-9 py-8 bg-white text-lg font-medium border-b">
      <div className="flex items-center gap-x-2">
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
    </div>
  );
};

export default TopBar;
