import { useSelector } from "react-redux";
import StepOne from "../booking/component/step_one";
import StepTwo from "../booking/component/step_two";
import StepThree from "../booking/component/step_three";
import StepFour from "../booking/component/step_four";
import StepFive from "../booking/component/step_five";
import StepSix from "../booking/component/step_six";
import StepSeven from "../booking/component/step_seven";
import Layout from "../../components/layout/layout";
// import StepEight from "./components/stepEight";

export default function Booking() {
  const currentStep = useSelector((state) => state.booking.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      case 6:
        return <StepSix />;
      case 7:
        return <StepSeven />;
      case 8:
        return <StepEight />;
      default:
        return <StepOne />;
    }
  };

  return <Layout>{renderStep()}</Layout>;
}
