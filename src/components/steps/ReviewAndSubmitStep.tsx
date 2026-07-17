import type {
    ChangeEvent,
    FormEvent,
  } from "react";
  
  import type {
    ApplicationFormData,
  } from "../../types/application";
  
  import "./Steps.css";
  
  interface ReviewAndSubmitStepProps {
    data: ApplicationFormData;
    termsError?: string;
    isSubmitted: boolean;
    onTermsChange: (accepted: boolean) => void;
    onEditStep: (step: 1 | 2) => void;
    onSubmit: () => void;
    onStartNew: () => void;
  }
  
  interface ReviewItemProps {
    label: string;
    value: string;
  }
  
  function ReviewItem({
    label,
    value,
  }: ReviewItemProps) {
    return (
      <div className="review-item">
        <dt>{label}</dt>
        <dd>{value}</dd>
      </div>
    );
  }
  
  function displayValue(value?: string) {
    return value?.trim() || "Not provided";
  }
  
  function ReviewAndSubmitStep({
    data,
    termsError,
    isSubmitted,
    onTermsChange,
    onEditStep,
    onSubmit,
    onStartNew,
  }: ReviewAndSubmitStepProps) {
    const {
      personalDetails,
      educationAndSkills,
      termsAccepted,
    } = data;
  
    const handleTermsChange = (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      onTermsChange(event.target.checked);
    };
  
    const handleSubmit = (
      event: FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();
      onSubmit();
    };
  
    if (isSubmitted) {
      return (
        <section
          className="submission-success"
          aria-labelledby="submission-success-heading"
        >
          <div
            className="success-icon"
            aria-hidden="true"
          >
            ✓
          </div>
  
          <p className="step-eyebrow">
            Application complete
          </p>
  
          <h2 id="submission-success-heading">
            Application prepared successfully
          </h2>
  
          <p>
            Your application has passed the form review.
            This is a simulated submission because this
            project does not use a backend.
          </p>
  
          <button
            type="button"
            className="primary-button start-new-button"
            onClick={onStartNew}
          >
            Start new application
          </button>
        </section>
      );
    }
  
    return (
      <form
        className="form-step review-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <header className="form-step-header">
          <p className="step-eyebrow">
            Step 3
          </p>
  
          <h2>Review and submit</h2>
  
          <p>
            Check your information carefully before
            completing the application.
          </p>
        </header>
  
        <section
          className="review-section"
          aria-labelledby="personal-review-heading"
        >
          <header className="review-section-header">
            <div>
              <p className="review-section-number">
                Section 1
              </p>
  
              <h3 id="personal-review-heading">
                Personal details
              </h3>
            </div>
  
            <button
              type="button"
              className="edit-section-button"
              onClick={() => onEditStep(1)}
            >
              Edit personal details
            </button>
          </header>
  
          <dl className="review-grid">
            <ReviewItem
              label="First name"
              value={displayValue(
                personalDetails.firstName,
              )}
            />
  
            <ReviewItem
              label="Last name"
              value={displayValue(
                personalDetails.lastName,
              )}
            />
  
            <ReviewItem
              label="Email address"
              value={displayValue(
                personalDetails.email,
              )}
            />
  
            <ReviewItem
              label="Phone number"
              value={displayValue(
                personalDetails.phoneNumber,
              )}
            />
  
            <ReviewItem
              label="Location"
              value={displayValue(
                personalDetails.location,
              )}
            />
  
            <ReviewItem
              label="LinkedIn"
              value={displayValue(
                personalDetails.linkedInUrl,
              )}
            />
  
            <ReviewItem
              label="Portfolio"
              value={displayValue(
                personalDetails.portfolioUrl,
              )}
            />
          </dl>
        </section>
  
        <section
          className="review-section"
          aria-labelledby="education-review-heading"
        >
          <header className="review-section-header">
            <div>
              <p className="review-section-number">
                Section 2
              </p>
  
              <h3 id="education-review-heading">
                Education and skills
              </h3>
            </div>
  
            <button
              type="button"
              className="edit-section-button"
              onClick={() => onEditStep(2)}
            >
              Edit education
            </button>
          </header>
  
          <dl className="review-grid">
            <ReviewItem
              label="Institution"
              value={displayValue(
                educationAndSkills.institution,
              )}
            />
  
            <ReviewItem
              label="Degree or programme"
              value={displayValue(
                educationAndSkills.degree,
              )}
            />
  
            <ReviewItem
              label="Current study year"
              value={
                educationAndSkills.currentYear
                  ? `Year ${educationAndSkills.currentYear}`
                  : "Not provided"
              }
            />
  
            <ReviewItem
              label="Expected graduation"
              value={displayValue(
                educationAndSkills
                  .expectedGraduationYear,
              )}
            />
  
            <ReviewItem
              label="Experience level"
              value={displayValue(
                educationAndSkills
                  .experienceLevel,
              )}
            />
  
            <ReviewItem
              label="CV filename"
              value={displayValue(
                educationAndSkills.cvFileName,
              )}
            />
          </dl>
  
          <div className="review-skills">
            <h4>Skills</h4>
  
            {educationAndSkills.skills.length > 0 ? (
              <ul className="review-skill-list">
                {educationAndSkills.skills.map(
                  (skill) => (
                    <li key={skill}>
                      {skill}
                    </li>
                  ),
                )}
              </ul>
            ) : (
              <p className="review-empty-value">
                No skills added.
              </p>
            )}
          </div>
        </section>
  
        <section className="submission-confirmation">
          <label className="confirmation-checkbox">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={handleTermsChange}
              aria-invalid={
                termsError ? true : undefined
              }
              aria-describedby={
                termsError
                  ? "terms-error"
                  : undefined
              }
            />
  
            <span>
              I confirm that the information provided
              is accurate and ready for submission.
            </span>
          </label>
  
          {termsError && (
            <p
              id="terms-error"
              className="form-error confirmation-error"
              role="alert"
            >
              {termsError}
            </p>
          )}
  
          <div className="review-submit-area">
            <p>
              This project demonstrates frontend form
              architecture. No information will be sent
              to a server.
            </p>
  
            <button
              type="submit"
              className="primary-button submit-application-button"
            >
              Submit application
            </button>
          </div>
        </section>
      </form>
    );
  }
  
  export default ReviewAndSubmitStep;