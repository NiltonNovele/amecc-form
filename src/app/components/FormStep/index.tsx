import { useFormStep } from "../../hooks/use-form-step";

import { YourInfo } from "./YourInfo";
import { Education } from "./Plans";
import { Summary } from "./Summary";

const steps = [
  {
    step: 1,
    component: YourInfo,
  },
  {
    step: 2,
    component: Education,
  },
  {
    step: 3,
    component: Summary,
  },
];

export function FormStep() {
  const { currentStep } = useFormStep();

  const step = steps.find(({ step }) => step === currentStep);

  return (
    <div className="flex flex-col flex-1 justify-between">
      {step && step.component()}
    </div>
  );
}
