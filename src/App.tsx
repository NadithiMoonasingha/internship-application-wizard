import {
  useEffect,
  useState,
} from "react";

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

import {
  clearStoredApplicationState,
  loadStoredApplicationState,
  saveStoredApplicationState,
} from "./utils/storage";

import {
  hasValidationErrors,
  validateEducationAndSkills,
  validatePersonalDetails,
  validateTermsAccepted,
} from "./utils/validation";

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

function createEmptyApplicationData(): ApplicationFormData {
  return {
    personalDetails: {
      ...initialApplicationData
        .personalDetails,
    },

    educationAndSkills: {
      ...initialApplicationData
        .educationAndSkills,
      skills: [],
    },

    termsAccepted: false,
  };
}

function App() {
  const [restoredState] = useState(
    loadStoredApplicationState,
  );

  const [currentStep, setCurrentStep] =
    useState<FormStep>(
      restoredState?.currentStep ?? 1,
    );

  const [formData, setFormData] =
    useState<ApplicationFormData>(
      restoredState?.formData ??
        createEmptyApplicationData(),
    );

  const [errors, setErrors] =
    useState<FormErrors>(
      initialFormErrors,
    );

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  useEffect(() => {
    if (isSubmitted) {
      return;
    }

    saveStoredApplicationState({
      currentStep,
      formData,
    });
  }, [
    currentStep,
    formData,
    isSubmitted,
  ]);

  function clearPersonalFieldError<
    K extends keyof PersonalDetails,
  >(field: K) {
    setErrors((currentErrors) => {
      const nextPersonalErrors = {
        ...currentErrors.personalDetails,
      };

      delete nextPersonalErrors[field];

      return {
        ...currentErrors,
        personalDetails:
          nextPersonalErrors,
      };
    });
  }

  function clearEducationFieldError<
    K extends keyof EducationAndSkills,
  >(field: K) {
    setErrors((currentErrors) => {
      const nextEducationErrors = {
        ...currentErrors.educationAndSkills,
      };

      delete nextEducationErrors[field];

      return {
        ...currentErrors,
        educationAndSkills:
          nextEducationErrors,
      };
    });
  }

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

    clearPersonalFieldError(field);
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

    clearEducationFieldError(field);
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

  const moveToStep = (
    step: FormStep,
  ) => {
    setCurrentStep(step);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePreviousStep = () => {
    moveToStep(
      previousSteps[currentStep],
    );
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const personalErrors =
        validatePersonalDetails(
          formData.personalDetails,
        );

      if (
        hasValidationErrors(
          personalErrors,
        )
      ) {
        setErrors(
          (currentErrors) => ({
            ...currentErrors,

            personalDetails:
              personalErrors,
          }),
        );

        return;
      }

      setErrors((currentErrors) => ({
        ...currentErrors,
        personalDetails: {},
      }));
    }

    if (currentStep === 2) {
      const educationErrors =
        validateEducationAndSkills(
          formData.educationAndSkills,
        );

      if (
        hasValidationErrors(
          educationErrors,
        )
      ) {
        setErrors(
          (currentErrors) => ({
            ...currentErrors,

            educationAndSkills:
              educationErrors,
          }),
        );

        return;
      }

      setErrors((currentErrors) => ({
        ...currentErrors,
        educationAndSkills: {},
      }));
    }

    moveToStep(
      nextSteps[currentStep],
    );
  };

  const handleEditStep = (
    step: 1 | 2,
  ) => {
    moveToStep(step);
  };

  const resetApplication = () => {
    clearStoredApplicationState();

    setFormData(
      createEmptyApplicationData(),
    );

    setErrors({
      personalDetails: {},
      educationAndSkills: {},
    });

    setCurrentStep(1);
    setIsSubmitted(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClearForm = () => {
    const shouldClear =
      window.confirm(
        "Clear all information entered in this application?",
      );

    if (!shouldClear) {
      return;
    }

    resetApplication();
  };

  const handleSubmit = () => {
    const personalErrors =
      validatePersonalDetails(
        formData.personalDetails,
      );

    const educationErrors =
      validateEducationAndSkills(
        formData.educationAndSkills,
      );

    const termsError =
      validateTermsAccepted(
        formData.termsAccepted,
      );

    setErrors({
      personalDetails:
        personalErrors,

      educationAndSkills:
        educationErrors,

      ...(termsError
        ? {
            termsAccepted:
              termsError,
          }
        : {}),
    });

    if (
      hasValidationErrors(
        personalErrors,
      )
    ) {
      moveToStep(1);
      return;
    }

    if (
      hasValidationErrors(
        educationErrors,
      )
    ) {
      moveToStep(2);
      return;
    }

    if (termsError) {
      return;
    }

    clearStoredApplicationState();
    setIsSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const personalErrorCount =
    Object.keys(
      errors.personalDetails,
    ).length;

  const educationErrorCount =
    Object.keys(
      errors.educationAndSkills,
    ).length;

  const currentStepErrorCount =
    currentStep === 1
      ? personalErrorCount
      : currentStep === 2
        ? educationErrorCount
        : 0;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStep
            data={
              formData.personalDetails
            }
            errors={
              errors.personalDetails
            }
            onChange={
              updatePersonalField
            }
          />
        );

      case 2:
        return (
          <EducationAndSkillsStep
            data={
              formData
                .educationAndSkills
            }
            errors={
              errors
                .educationAndSkills
            }
            onChange={
              updateEducationField
            }
          />
        );

      case 3:
        return (
          <ReviewAndSubmitStep
            data={formData}
            termsError={
              errors.termsAccepted
            }
            isSubmitted={
              isSubmitted
            }
            onTermsChange={
              updateTermsAccepted
            }
            onEditStep={
              handleEditStep
            }
            onSubmit={
              handleSubmit
            }
            onStartNew={
              resetApplication
            }
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
            Complete each section to
            prepare your internship
            application. Your progress
            is saved automatically in
            this browser.
          </p>
        </header>

        <nav
          className="progress-indicator"
          aria-label="Application progress"
        >
          {wizardSteps.map((step) => {
            const isActive =
              step.number ===
              currentStep;

            const isCompleted =
              step.number <
              currentStep;

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

        <div
          className="storage-notice"
          role="status"
        >
          <span
            className="storage-notice-icon"
            aria-hidden="true"
          >
            ✓
          </span>

          <span>
            Progress is saved
            automatically on this
            device.
          </span>
        </div>

        <div className="wizard-content">
          {currentStepErrorCount >
            0 && (
            <div
              className="validation-summary"
              role="alert"
            >
              <strong>
                Please check this
                section.
              </strong>

              <span>
                {
                  currentStepErrorCount
                }{" "}
                {currentStepErrorCount ===
                1
                  ? "field needs"
                  : "fields need"}{" "}
                your attention.
              </span>
            </div>
          )}

          {renderCurrentStep()}
        </div>

        {!isSubmitted && (
          <footer className="wizard-navigation">
            <div className="wizard-navigation-left">
              <button
                type="button"
                className="secondary-button"
                onClick={
                  handlePreviousStep
                }
                disabled={
                  currentStep === 1
                }
              >
                Previous
              </button>

              <button
                type="button"
                className="clear-form-button"
                onClick={
                  handleClearForm
                }
              >
                Clear form
              </button>
            </div>

            {currentStep < 3 && (
              <button
                type="button"
                className="primary-button"
                onClick={
                  handleNextStep
                }
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