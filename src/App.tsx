import { useState } from "react";
import "./App.css";

import {
  EducationAndSkillsStep,
  PersonalDetailsStep,
  ReviewAndSubmitStep,
} from "./components/steps";

import {
  initialApplicationData,
  initialFormErrors,
} from "./data/initialFormData";

import type {
  ApplicationFormData,
  EducationAndSkills,
  FormErrors,
  FormStep,
  PersonalDetails,
} from "./types/application";

interface WizardStep {
  number: FormStep;
  label: string;
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

function App() {
  const [currentStep, setCurrentStep] =
    useState<FormStep>(1);

  const [formData, setFormData] =
    useState<ApplicationFormData>(
      initialApplicationData,
    );

  const [errors, setErrors] =
    useState<FormErrors>(initialFormErrors);

  const [isSubmitted, setIsSubmitted] =
    useState(false);

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

  function updateEducationField<
    K extends keyof EducationAndSkills,
  >(
    field: K,
    value: EducationAndSkills[K],
  ) {
    setFormData((currentData) => ({
      ...currentData,
      educationAndSkills: {
        ...currentData.educationAndSkills,
        [field]: value,
      },
    }));
  }

  const updateTermsAccepted = (
    accepted: boolean,
  ) => {
    setFormData((currentData) => ({
      ...currentData,
      termsAccepted: accepted,
    }));

    if (accepted) {
      setErrors((currentErrors) => {
        const nextErrors = {
          ...currentErrors,
        };

        delete nextErrors.termsAccepted;

        return nextErrors;
      });
    }
  };

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

  const handleEditStep = (
    step: 1 | 2,
  ) => {
    setCurrentStep(step);
  };

  const handleSubmit = () => {
    if (!formData.termsAccepted) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        termsAccepted:
          "Please confirm that your information is accurate.",
      }));

      return;
    }

    setIsSubmitted(true);
  };

  const handleStartNew = () => {
    setFormData({
      personalDetails: {
        ...initialApplicationData.personalDetails,
      },

      educationAndSkills: {
        ...initialApplicationData
          .educationAndSkills,
        skills: [],
      },

      termsAccepted: false,
    });

    setErrors({
      personalDetails: {},
      educationAndSkills: {},
    });

    setCurrentStep(1);
    setIsSubmitted(false);
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
          <EducationAndSkillsStep
            data={
              formData.educationAndSkills
            }
            errors={
              errors.educationAndSkills
            }
            onChange={updateEducationField}
          />
        );

      case 3:
        return (
          <ReviewAndSubmitStep
            data={formData}
            termsError={
              errors.termsAccepted
            }
            isSubmitted={isSubmitted}
            onTermsChange={
              updateTermsAccepted
            }
            onEditStep={handleEditStep}
            onSubmit={handleSubmit}
            onStartNew={handleStartNew}
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

          <h1>
            Application Form Wizard
          </h1>

          <p>
            Complete each section to prepare your
            internship application. Your information
            will remain in your browser until you
            submit or clear the form.
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
              isActive
                ? "progress-step-active"
                : "",
              isCompleted
                ? "progress-step-completed"
                : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={step.number}
                className={classNames}
                aria-current={
                  isActive
                    ? "step"
                    : undefined
                }
              >
                <span className="progress-step-number">
                  {isCompleted
                    ? "✓"
                    : step.number}
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

        {!isSubmitted && (
          <footer className="wizard-navigation">
            <button
              type="button"
              className="secondary-button"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
            >
              Previous
            </button>

            {currentStep < 3 && (
              <button
                type="button"
                className="primary-button"
                onClick={handleNextStep}
              >
                Next
              </button>
            )}
          </footer>
        )}
      </section>
    </main>
  );
}

export default App;