import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { routes } from "./routes";
import { navConstants } from "../constants/common";
import { Avatar } from "../assets/images";
import { updateIsAuthenticated } from "../store/user";
import { CloseIcon, HamburgerIcon } from "../assets/icons";
import { updateNavCollapse, updateNavOpen } from "../store/leftNav";
import { COLORS } from "../constants/colors";
import Form from "../pages/form/Form";
import UsersListing from "../pages/users/UsersListing";
import UserDetail from "../pages/user-detail/UserDetail";
import Country from "../pages/country/Country";
import CountryDetail from "../pages/country-detail/CountryDetail";
import AddDeal from "../pages/deals/AddDeal";

const PrivateLayout = () => {
  const [selectedTab, setSelectedTab] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = window.location;

  const { isNavOpen, isNavCollapse } = useSelector((state) => state.leftNav);

  useEffect(() => {
    setSelectedTab("/" + pathname.split("/")[1]);
  }, [pathname]);

  const handleTabClick = (path) => {
    setSelectedTab(path);
    navigate(path);
    dispatch(updateNavOpen(false));
  };

  const onLogout = () => {
    dispatch(updateIsAuthenticated("false"));
    localStorage.setItem("isAuthenticated", "false");
  };

  const handleNavClick = () => {
    dispatch(updateNavOpen(false));
  };

  const handleNavCollapse = () => {
    dispatch(updateNavCollapse(!isNavCollapse));
  };

  return (
    <div
      className={`relative w-full h-screen flex overflow-y-hidden flex-col sm:flex-row`}
    >
      {/* mobile view */}
      <div
        className={`relative bg-white z-[100] h-screen min-h-screen px-2 pt-20 flex flex-col justify-between gap-y-3 w-full ${
          isNavOpen ? "animate-slide-to-right" : "animate-slide-to-left"
        } sm:hidden sm:w-0`}
      >
        <div className="absolute top-5 right-5">
          <CloseIcon width={40} height={40} onClick={handleNavClick} />
        </div>
        <div className="pt-20 flex flex-col gap-y-3">
          {navConstants.map(({ path, label, icon: NavIcon }) => (
            <div
              key={path}
              className={`w-full rounded-md px-5 py-2 hover:bg-harp/60 cursor-pointer flex items-center gap-x-4 ${
                selectedTab === path
                  ? "text-primaryColor bg-hawksBlue/30"
                  : "text-black"
              }`}
              onClick={() => handleTabClick(path)}
            >
              <NavIcon
                width={20}
                height={20}
                fill={
                  selectedTab === path ? COLORS.PRIMARY_COLOR : COLORS.DAVY_GREY
                }
                stroke={COLORS.SLATE_GREY}
              />
              {label}
            </div>
          ))}
        </div>
        <div
          className="mb-2 px-5 py-5 bg-hawksBlue/50 rounded-md flex items-center gap-x-5 cursor-pointer"
          onClick={onLogout}
        >
          <img src={Avatar} alt="profile" className="w-8 h-8 rounded-full" />
          <div>Logout</div>
        </div>
      </div>

      {/* desktop view */}
      <div
        className={`relative bg-white px-2 pt-20 flex-col gap-y-3 border-r sm:h-screen ${
          isNavCollapse ? "w-[75px] items-center" : "w-1/5"
        } hidden sm:flex justify-between`}
      >
        <div className={`absolute top-9 ${isNavCollapse ? "" : "right-5"}`}>
          <HamburgerIcon
            width={25}
            height={25}
            onClick={handleNavCollapse}
            className="cursor-pointer"
          />
        </div>
        <div className="pt-20 flex flex-col gap-y-3">
          {navConstants.map(({ path, label, icon: NavIcon }) => (
            <div
              key={path}
              className={`w-full rounded-md px-5 py-3 hover:bg-harp/60 cursor-pointer flex items-center gap-x-4 ${
                selectedTab === path
                  ? "text-primaryColor bg-hawksBlue/30"
                  : "text-black"
              } ${isNavCollapse ? "justify-center" : "justify-start"}`}
              onClick={() => handleTabClick(path)}
            >
              <NavIcon
                width={20}
                height={20}
                fill={
                  selectedTab === path ? COLORS.PRIMARY_COLOR : COLORS.DAVY_GREY
                }
                stroke={COLORS.SLATE_GREY}
              />
              {!isNavCollapse && <div>{label}</div>}
            </div>
          ))}
        </div>
        <div
          className={`bg-hawksBlue/50 rounded-md flex items-center gap-x-5 cursor-pointer ${
            isNavCollapse ? "mb-2 px-2 py-3" : "px-5 py-5 mb-4"
          }`}
          onClick={onLogout}
        >
          <img src={Avatar} alt="profile" className="w-10 h-10 rounded-full" />
          {!isNavCollapse && <div>Logout</div>}
        </div>
      </div>

      <div
        className={`absolute top-0 right-0 w-full ${
          isNavCollapse ? "sm:w-[calc(100%-75px)]" : "sm:w-4/5"
        }`}
      >
        <Routes>
          <Route path={routes.COUNTRY_LIST} element={<Country />} />
          <Route path={routes.FORM} element={<Form />} />
          <Route path={`${routes.FORM}/:userId`} element={<Form />} />
          <Route path={routes.DEALS} element={<AddDeal />} />
          <Route path={routes.USERS} element={<UsersListing />} />
          <Route path={`${routes.USERS}/:userId`} element={<UserDetail />} />
          <Route
            path={`${routes.COUNTRY_LIST}/:country`}
            element={<CountryDetail />}
          />
          <Route
            path={routes.ALL}
            element={<Navigate replace={true} to={routes.FORM} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default PrivateLayout;
