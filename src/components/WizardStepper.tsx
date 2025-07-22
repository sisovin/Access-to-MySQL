import React from "react";
import { Check, Loader2 } from "lucide-react";

interface WizardStepperProps {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
  loading?: boolean;
}

const WizardStepper = ({
  steps = [
    "Database Selection",
    "MySQL Configuration",
    "Preview",
    "Transfer",
    "Complete",
  ],
  currentStep = 0,
  completedSteps = [],
  loading = false,
}: WizardStepperProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index === currentStep
                    ? "border-primary bg-primary/10 text-primary"
                    : completedSteps.includes(index)
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 text-gray-400"
                }`}
              >
                {completedSteps.includes(index) ? (
                  <Check className="w-5 h-5" />
                ) : loading && index === currentStep ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  index === currentStep
                    ? "text-primary"
                    : completedSteps.includes(index)
                      ? "text-green-500"
                      : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${completedSteps.includes(index) ? "bg-green-500" : "bg-gray-200"}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WizardStepper;
