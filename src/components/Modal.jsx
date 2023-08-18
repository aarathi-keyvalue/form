/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const { children } = props;

  const modalRootElement = document.getElementById("modal-root");

  const PopUp = useCallback(({ children: portalChildren }) => {
    return ReactDOM.createPortal(portalChildren, modalRootElement);
  }, []);

  return (
    <PopUp>
      <div
        className="right-0 flex fixed top-0 left-0 justify-center items-center 
        w-full h-full bg-secondaryColor/[0.4] overflow-auto"
      >
        {children}
      </div>
    </PopUp>
  );
};

export default Modal;
