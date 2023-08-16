import { useDispatch } from "react-redux";

import { HamburgerIcon } from "../assets/icons";
import { updateNavOpen } from "../store/leftNav";

const TopBar = (props) => {
  const { headerText } = props;

  const dispatch = useDispatch();
  
  const handleNavClick = () => {
    dispatch(updateNavOpen(true));
  };

  return (
    <div className="w-full px-4 sm:px-10 py-8 bg-white text-lg font-medium border-b flex gap-x-5 items-center">
      <div className="cursor-pointer p-2 sm:hidden" onClick={handleNavClick}>
        <HamburgerIcon width={20} height={20} />
      </div>
      {headerText}
    </div>
  );
};

export default TopBar;
