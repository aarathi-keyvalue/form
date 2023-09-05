import { useEffect, useState } from "react";

const Stepper = (prop) => {
  const { stepperState } = prop;

  const { pathname } = window.location;
  const [state, setState] = useState();

  useEffect(() => {
    setState(stepperState.findIndex((state) => state.path === pathname) + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="w-full flex items-center justify-center gap-x-2">
      {stepperState.map(({ id, label }) => (
        <div key={id} className="flex items-center gap-x-2">
          <div
            className={`h-5 w-5 rounded-full flex items-center justify-center text-xs text-white ${
              id > state ? "bg-osloGrey" : "bg-primaryColor"
            }`}
          >
            {id}
          </div>
          <div
            className={`text-xs ${
              id === state ? "text-primaryColor" : "text-osloGrey"
            }`}
          >
            {label}
          </div>
          {id !== stepperState.length && (
            <div className="w-20 h-[1px] bg-osloGrey" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
