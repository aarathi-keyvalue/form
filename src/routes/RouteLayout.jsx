/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { routes } from "./routes";
import { setUser, updateIsAuthenticated } from "../store/user";
import FloatingBtn from "../components/FloatingBtn";
import AddPopup from "../components/AddPopup/AddPopup";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";

const RouteLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(isOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateIsAuthenticated(localStorage.getItem("isAuthenticated") ?? false)
    );
    dispatch(
      setUser(
        localStorage.getItem("users")
          ? JSON.parse(localStorage.getItem("users"))
          : []
      )
    );
  }, []);

  const { isAuthenticated } = useSelector((state) => state.users);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setShowPopup(false), 710);
    } else setShowPopup(isOpen);
  }, [isOpen]);

  return (
    <div className="relative w-full h-screen flex overflow-y-hidden">
      <Routes>
        <Route
          path={routes.ALL}
          element={
            isAuthenticated === "true" ? <PrivateLayout /> : <PublicLayout />
          }
        />
      </Routes>
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
