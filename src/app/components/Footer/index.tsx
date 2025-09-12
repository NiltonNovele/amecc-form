import { useFormStep } from "../../hooks/use-form-step";

interface FooterProps {
  handleGoBack: () => void;
  handleGoForwardStep: () => void;
}

export function Footer({ handleGoBack, handleGoForwardStep }: FooterProps) {
  const { currentStep, steps } = useFormStep();

  const numberOfSteps = steps.length;
  const isLastStep = currentStep === numberOfSteps;

  return (
    <footer className="p-4 bg-white flex flex-col items-center">
      {/* Buttons */}
      <div className="flex justify-between w-full max-w-md mb-2">
        <button
          onClick={handleGoBack}
          className={`border-none text-sm text-grey font-medium ${
            currentStep === 1 ? "invisible" : "visible"
          } sm:text-base`}
        >
          Go back
        </button>
        <button
          onClick={handleGoForwardStep}
          className={`${
            isLastStep ? "bg-purple" : "bg-denim"
          } py-3 px-4 rounded text-sm text-white font-medium sm:text-base`}
        >
          {isLastStep ? "Confirm" : "Next step"}
        </button>
      </div>

      {/* Developed by */}
      <div className="text-xs text-gray-400 mt-3 text-center">
        Developed by{" "}
        <a
          href="https://synctechx.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-600 transition-colors duration-200"
        >
          SynctechX
        </a>
      </div>
    </footer>
  );
}
