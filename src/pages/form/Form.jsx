import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { STEPPER_STATES } from "../../constants/form";
import { Stepper, TopBar } from "../../components";
import { topBarConstants } from "../../constants/common";
import { routes } from "../../routes/routes";
import PersonalForm from "./components/PersonalForm";
import DealsForm from "./components/DealsForm";

const Form = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [currentStepperState, setCurrentStepperState] = useState(1);

  return (
    <div className="w-full h-full">
      <TopBar
        headerText={topBarConstants.PERSONAL_FORM}
        showNavigateBack={userId}
        handleBackClick={() => navigate(routes.USERS)}
      />
      <div className="w-full h-[calc(100vh-93px)] flex flex-col p-4 overflow-y-auto sm:px-10 sm:pt-12">
        <Stepper
          stepperState={STEPPER_STATES}
          currentState={currentStepperState}
        />
        {currentStepperState === 1 && (
          <PersonalForm setStepperState={setCurrentStepperState} />
        )}
        {currentStepperState === 2 && <DealsForm />}
      </div>
    </div>
  );
};

export default Form;
