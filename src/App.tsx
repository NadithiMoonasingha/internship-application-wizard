import { useState } from "react";
import "./App.css";

import { PersonalDetailsStep } from "./components/steps";

import {
  initialApplicationData,
  initialFormErrors,
} from "./data/initialFormData";

import type {
  ApplicationFormData,
  FormErrors,
  FormStep,
  PersonalDetails,
} from "./types/application";

interface WizardStep {
  number: FormStep;
  label: string;
}

interface StepPlaceholderProps {
  step: FormStep;
  title: string;
  description: string;
}

const wizardSteps: ReadonlyArray<WizardStep> = [
  {
    number: 1,
    label: "Personal",
  },
  {
    number: 2,
    label: "Education",
  },
  {
    number: 3,
    label: "Review",
  },
];

const previousSteps: Record<FormStep, FormStep> = {
  1: 1,
  2: 1,
  3: 2,
};

const nextSteps: Record<FormStep, FormStep> = {
  1: 2,
  2: 3,
  3: 3,
};

function StepPlaceholder({
  step,
  title,
  description,
}: StepPlaceholderProps) {
  return (
    <section
      className="step-placeholder"
      aria-labelledby={`placeholder-heading-${step}`}
    >
      <p className="placeholder-step-number">
        Step {step}
      </p>

      <h2 id={`placeholder-heading-${step}`}>
        {title}
      </h2>

      <p>{description}</p>
    </section>
  );
}

function App() {
  const [currentStep, setCurrentStep] =
    useState<FormStep>(1);

  const [formData, setFormData] =
    useState<ApplicationFormData>(
      initialApplicationData,
    );

  const [errors] =
    useState<FormErrors>(initialFormErrors);

  function updatePersonalField<
    K extends keyof PersonalDetails,
  >(
    field: K,
    value: PersonalDetails[K],
  ) {
    setFormData((currentData) => ({
      ...currentData,
      personalDetails: {
        ...currentData.personalDetails,
        [field]: value,
      },
    }));
  }

  const handlePreviousStep = () => {
    setCurrentStep(
      (current) => previousSteps[current],
    );
  };

  const handleNextStep = () => {
    setCurrentStep(
      (current) => nextSteps[current],
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStep
            data={formData.personalDetails}
            errors={errors.personalDetails}
            onChange={updatePersonalField}
          />
        );

      case 2:
        return (
          <StepPlaceholder
            step={2}
            title="Education and skills"
            description="The education, skills and CV fields will be added in the next feature."
          />
        );

      case 3:
        return (
          <StepPlaceholder
            step={3}
            title="Review and submit"
            description="The final application review will be added after the form steps are complete."
          />
        );
    }
  };

  return (
    <main className="app">
      <section className="wizard-container">
        <header className="wizard-header">
          <p className="wizard-label">
            Internship Application
          </p>

          <h1>Application Form Wizard</h1>

          <p>
            Complete each section to prepare your internship application.
            Your information will remain in your browser until you submit or
            clear the form.
          </p>
        </header>

        <nav
          className="progress-indicator"
          aria-label="Application progress"
        >
          {wizardSteps.map((step) => {
            const isActive =
              step.number === currentStep;

            const isCompleted =
              step.number < currentStep;

            const classNames = [
              "progress-step",
              isActive ? "progress-step-active" : "",
              isCompleted ? "progress-step-completed" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={step.number}
                className={classNames}
                aria-current={
                  isActive ? "step" : undefined
                }
              >
                <span className="progress-step-number">
                  {isCompleted ? "✓" : step.number}
                </span>

                <span className="progress-step-label">
                  {step.label}
                </span>
              </div>
            );
          })}
        </nav>

        <div className="wizard-content">
          {renderCurrentStep()}
        </div>

        <footer className="wizard-navigation">
          <button
            type="button"
            className="secondary-button"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
          >
            Previous
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={handleNextStep}
            disabled={currentStep === 3}
          >
            Next
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;