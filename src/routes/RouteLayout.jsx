import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { routes } from "./routes";
import { navConstants } from "../constants/common";
import { CloseIcon } from "../assets/icons";
import { updateNavOpen } from "../store/leftNav";
import Form from "../pages/form/Form";
import Country from "../pages/country/Country";
import CountryDetail from "../pages/country-detail/CountryDetail";
import FloatingBtn from "../components/FloatingBtn";
import AddPopup from "../components/AddPopup/AddPopup";
import UsersListing from "../pages/users/UsersListing";
import UserDetail from "../pages/user-detail/UserDetail";

const RouteLayout = () => {
  const [selectedTab, setSelectedTab] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(isOpen);

  const { isNavOpen } = useSelector((state) => state.leftNav);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setShowPopup(false), 710);
    } else setShowPopup(isOpen);
  }, [isOpen]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = window.location;

  useEffect(() => {
    setSelectedTab("/" + pathname.split("/")[1]);
  }, [pathname]);

  const handleTabClick = (path) => {
    setSelectedTab(path);
    navigate(path);
    dispatch(updateNavOpen(false));
  };

  const handleNavClick = () => {
    dispatch(updateNavOpen(false));
  };

  return (
    <div
      className={`relative w-full h-screen flex overflow-y-hidden flex-col sm:flex-row`}
    >
      {/* mobile view */}
      <div
        className={`relative bg-white z-[100] h-screen min-h-screen px-2 py-20 flex flex-col gap-y-3 w-full ${
          isNavOpen ? "animate-slide-to-right" : "animate-slide-to-left"
        } sm:hidden sm:w-0`}
      >
        <div className="absolute top-5 right-5">
          <CloseIcon width={40} height={40} onClick={handleNavClick} />
        </div>
        {navConstants.map((navItem) => (
          <div
            key={navItem.path}
            className={`w-full rounded-md px-5 py-2 hover:bg-harp/60 cursor-pointer ${
              selectedTab === navItem.path
                ? "text-primaryColor bg-hawksBlue/30"
                : "text-black"
            }`}
            onClick={() => handleTabClick(navItem.path)}
          >
            {navItem.label}
          </div>
        ))}
      </div>

      {/* desktop view */}
      <div
        className={`bg-white px-2 py-20 flex-col gap-y-3 border-r sm:h-screen w-1/5 sm:flex`}
      >
        {navConstants.map((navItem) => (
          <div
            key={navItem.path}
            className={`w-full rounded-md px-5 py-2 hover:bg-harp/60 cursor-pointer ${
              selectedTab === navItem.path
                ? "text-primaryColor bg-hawksBlue/30"
                : "text-black"
            }`}
            onClick={() => handleTabClick(navItem.path)}
          >
            {navItem.label}
          </div>
        ))}
      </div>

      <div className="absolute top-0 right-0 w-full sm:w-4/5">
        <Routes>
          <Route path={routes.COUNTRY_LIST} element={<Country />} />
          <Route path={routes.FORM} element={<Form />} />
          <Route path={`${routes.FORM}/:userId`} element={<Form />} />
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
      {showPopup ? (
        <AddPopup isOpen={isOpen} onClick={() => setIsOpen(false)} />
      ) : (
        <FloatingBtn
          onClick={() => setIsOpen(true)}
          className="absolute bottom-3 right-7 float-right"
        />
      )}
    </div>
  );
};

export default RouteLayout;
