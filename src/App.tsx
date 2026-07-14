import { useState } from "react";
import "./App.css";

// Import initial state configurations for the form structure
import {
  initialApplicationData,
  initialFormErrors,
} from "./data/initialFormData";

// Import TypeScript type definitions to ensure type safety across the wizard
import type {
  ApplicationFormData,
  FormErrors,
  FormStep,
} from "./types/application";

/**
 * Configuration Maps for Wizard Navigation & UI
 */

// Mapping each multi-step wizard screen to its respective user-facing section title
const stepTitles: Record<FormStep, string> = {
  1: "Personal details",
  2: "Education and skills",
  3: "Review and submit",
};

// State machine definition for navigating backward through the application steps
const previousSteps: Record<FormStep, FormStep> = {
  1: 1, // Stay on step 1 if trying to go back from the beginning
  2: 1,
  3: 2,
};

// State machine definition for navigating forward through the application steps
const nextSteps: Record<FormStep, FormStep> = {
  1: 2,
  2: 3,
  3: 3, // Stay on step 3 if trying to advance past the final step
};

function App() {
  /**
   * Component State Management
   */
  
  // Tracks the active step of the wizard workflow (Defaults to step 1)
  const [currentStep, setCurrentStep] = useState<FormStep>(1);

  // Core multi-step application form data containing user inputs
  const [formData] = useState<ApplicationFormData>(
    initialApplicationData,
  );

  // Tracks active field validation errors grouped by form sections
  const [errors] = useState<FormErrors>(initialFormErrors);

  /**
   * Navigation Event Handlers
   */

  // Updates wizard step state to shift view back to the previous section
  const handlePreviousStep = () => {
    setCurrentStep((current) => previousSteps[current]);
  };

  // Updates wizard step state to progress view forward to the next section
  const handleNextStep = () => {
    setCurrentStep((current) => nextSteps[current]);
  };

  /**
   * Derived Computed Metrics
   */

  // Dynamically aggregates the total count of error items present across all form sections
  const numberOfErrors =
    Object.keys(errors.personalDetails).length +
    Object.keys(errors.educationAndSkills).length +
    (errors.termsAccepted ? 1 : 0);

  // Generates a formatted string representing the user's full name, trimming trailing spaces if fields are blank
  const applicantName =
    `${formData.personalDetails.firstName} ${formData.personalDetails.lastName}`.trim();

  return (
    <main className="app">
      <section className="wizard-container">
        {/* Main Application Introduction */}
        <header className="wizard-header">
          <p className="wizard-label">Internship Application</p>
          <h1>Application Form Wizard</h1>
          <p>
            Complete the three steps below to prepare your internship
            application.
          </p>
        </header>

        {/* Wizard Panel Component */}
        <section className="type-check-card">
          {/* Dynamic Progress Indicator & Step Section Header */}
          <div className="step-status">
            <p className="step-number">
              Step {currentStep} of 3
            </p>
            <h2>{stepTitles[currentStep]}</h2>
            <p>
              The strongly typed form structure has been successfully
              connected to React state.
            </p>
          </div>

          {/* Live Data Summary Display Box */}
          <div className="type-summary">
            <div>
              <span>Applicant</span>
              <strong>{applicantName || "Not entered yet"}</strong>
            </div>

            <div>
              <span>Skills selected</span>
              <strong>
                {formData.educationAndSkills.skills.length}
              </strong>
            </div>

            <div>
              <span>Validation errors</span>
              <strong>{numberOfErrors}</strong>
            </div>
          </div>

          {/* Action Control Interface */}
          <div className="navigation-buttons">
            <button
              type="button"
              className="secondary-button"
              onClick={handlePreviousStep}
              disabled={currentStep === 1} // Disables if user is on the first step
            >
              Previous
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={handleNextStep}
              disabled={currentStep === 3} // Disables if user reaches the submission overview
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