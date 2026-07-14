import { useState } from "react";
import "./App.css";

import {
  SelectInput,
  TextInput,
} from "./components/form";

import type { SelectOption } from "./components/form";

import {
  initialApplicationData,
  initialFormErrors,
} from "./data/initialFormData";

import type {
  ApplicationFormData,
  ExperienceLevel,
  FormErrors,
  FormStep,
} from "./types/application";

type PersonalDetailsData =
  ApplicationFormData["personalDetails"];

type EducationAndSkillsData =
  ApplicationFormData["educationAndSkills"];

const stepTitles: Record<FormStep, string> = {
  1: "Personal details",
  2: "Education and skills",
  3: "Review and submit",
};

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

const experienceOptions: ReadonlyArray<
  SelectOption<ExperienceLevel>
> = [
  {
    value: "",
    label: "Select your experience level",
    disabled: true,
  },
  {
    value: "Beginner",
    label: "Beginner",
  },
  {
    value: "Intermediate",
    label: "Intermediate",
  },
  {
    value: "Advanced",
    label: "Advanced",
  },
];

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
    K extends keyof PersonalDetailsData,
  >(
    field: K,
    value: PersonalDetailsData[K],
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
    K extends keyof EducationAndSkillsData,
  >(
    field: K,
    value: EducationAndSkillsData[K],
  ) {
    setFormData((currentData) => ({
      ...currentData,
      educationAndSkills: {
        ...currentData.educationAndSkills,
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

  const numberOfErrors =
    Object.keys(errors.personalDetails).length +
    Object.keys(errors.educationAndSkills).length +
    (errors.termsAccepted ? 1 : 0);

  const applicantName =
    `${formData.personalDetails.firstName} ${formData.personalDetails.lastName}`.trim();

  return (
    <main className="app">
      <section className="wizard-container">
        <header className="wizard-header">
          <p className="wizard-label">
            Internship Application
          </p>

          <h1>Application Form Wizard</h1>

          <p>
            Complete the three steps below to prepare
            your internship application.
          </p>
        </header>

        <section className="type-check-card">
          <div className="step-status">
            <p className="step-number">
              Step {currentStep} of 3
            </p>

            <h2>{stepTitles[currentStep]}</h2>

            <p>
              Reusable typed form components are now
              connected to the application state.
            </p>
          </div>

          <div className="type-summary">
            <div>
              <span>Applicant</span>
              <strong>
                {applicantName || "Not entered yet"}
              </strong>
            </div>

            <div>
              <span>Experience</span>
              <strong>
                {formData.educationAndSkills
                  .experienceLevel ||
                  "Not selected"}
              </strong>
            </div>

            <div>
              <span>Validation errors</span>
              <strong>{numberOfErrors}</strong>
            </div>
          </div>

          <section className="component-preview">
            <div className="preview-heading">
              <p className="step-number">
                Component preview
              </p>

              <h2>Reusable typed controls</h2>

              <p>
                Enter sample values to confirm that the
                components update the typed form state.
              </p>
            </div>

            <div className="preview-grid">
              <TextInput
                id="preview-first-name"
                label="First name"
                value={
                  formData.personalDetails.firstName
                }
                onChange={(value) =>
                  updatePersonalField(
                    "firstName",
                    value,
                  )
                }
                type="text"
                placeholder="Enter your first name"
                autoComplete="given-name"
                required
              />

              <TextInput
                id="preview-email"
                label="Email address"
                value={
                  formData.personalDetails.email
                }
                onChange={(value) =>
                  updatePersonalField("email", value)
                }
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                helperText="Use an email address you check regularly."
                required
              />

              <SelectInput
                id="preview-experience"
                label="Experience level"
                value={
                  formData.educationAndSkills
                    .experienceLevel
                }
                options={experienceOptions}
                onChange={(value) =>
                  updateEducationField(
                    "experienceLevel",
                    value,
                  )
                }
                required
              />
            </div>
          </section>

          <div className="navigation-buttons">
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
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;