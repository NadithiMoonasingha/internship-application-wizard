import { TextInput } from "../form";
import type {
  PersonalDetails,
  PersonalDetailsErrors,
} from "../../types/application";

import "./Steps.css";

interface PersonalDetailsStepProps {
  data: PersonalDetails;
  errors: PersonalDetailsErrors;
  onChange: <K extends keyof PersonalDetails>(
    field: K,
    value: PersonalDetails[K],
  ) => void;
}

function PersonalDetailsStep({
  data,
  errors,
  onChange,
}: PersonalDetailsStepProps) {
  return (
    <section
      className="form-step"
      aria-labelledby="personal-details-heading"
    >
      <header className="form-step-header">
        <p className="step-eyebrow">Step 1</p>

        <h2 id="personal-details-heading">
          Personal details
        </h2>

        <p>
          Enter the contact information an employer can use to identify and
          contact you.
        </p>
      </header>

      <div className="form-grid">
        <TextInput
          id="first-name"
          label="First name"
          value={data.firstName}
          onChange={(value) =>
            onChange("firstName", value)
          }
          error={errors.firstName}
          type="text"
          placeholder="Enter your first name"
          autoComplete="given-name"
          required
        />

        <TextInput
          id="last-name"
          label="Last name"
          value={data.lastName}
          onChange={(value) =>
            onChange("lastName", value)
          }
          error={errors.lastName}
          type="text"
          placeholder="Enter your last name"
          autoComplete="family-name"
          required
        />

        <TextInput
          id="email"
          label="Email address"
          value={data.email}
          onChange={(value) =>
            onChange("email", value)
          }
          error={errors.email}
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          helperText="Use an email address you check regularly."
          required
        />

        <TextInput
          id="phone-number"
          label="Phone number"
          value={data.phoneNumber}
          onChange={(value) =>
            onChange("phoneNumber", value)
          }
          error={errors.phoneNumber}
          type="tel"
          inputMode="tel"
          placeholder="+94 77 123 4567"
          autoComplete="tel"
          required
        />

        <div className="full-width-field">
          <TextInput
            id="location"
            label="Location"
            value={data.location}
            onChange={(value) =>
              onChange("location", value)
            }
            error={errors.location}
            type="text"
            placeholder="Colombo, Sri Lanka"
            autoComplete="address-level2"
            helperText="Your city and country are enough."
            required
          />
        </div>

        <TextInput
          id="linkedin-url"
          label="LinkedIn URL"
          value={data.linkedInUrl ?? ""}
          onChange={(value) =>
            onChange("linkedInUrl", value)
          }
          error={errors.linkedInUrl}
          type="url"
          inputMode="url"
          placeholder="https://linkedin.com/in/username"
          autoComplete="url"
          helperText="Optional"
        />

        <TextInput
          id="portfolio-url"
          label="Portfolio URL"
          value={data.portfolioUrl ?? ""}
          onChange={(value) =>
            onChange("portfolioUrl", value)
          }
          error={errors.portfolioUrl}
          type="url"
          inputMode="url"
          placeholder="https://yourportfolio.com"
          autoComplete="url"
          helperText="Optional"
        />
      </div>
    </section>
  );
}

export default PersonalDetailsStep;