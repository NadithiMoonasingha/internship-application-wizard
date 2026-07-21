import { initialApplicationData } from "../data/initialFormData";

import type {
  ApplicationFormData,
  ExperienceLevel,
  FormStep,
  StudyYear,
} from "../types/application";

export const APPLICATION_STORAGE_KEY =
  "internship-application-wizard";

const STORAGE_VERSION = 1;

const validFormSteps: ReadonlyArray<FormStep> = [
  1,
  2,
  3,
];

const validStudyYears: ReadonlyArray<StudyYear> = [
  "",
  "1",
  "2",
  "3",
  "4",
  "5",
];

const validExperienceLevels: ReadonlyArray<ExperienceLevel> = [
  "",
  "Beginner",
  "Intermediate",
  "Advanced",
];

export interface StoredApplicationState {
  version: typeof STORAGE_VERSION;
  currentStep: FormStep;
  formData: ApplicationFormData;
}

type ApplicationStateToSave = Omit<
  StoredApplicationState,
  "version"
>;

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function getString(
  value: unknown,
  fallback = "",
) {
  return typeof value === "string"
    ? value
    : fallback;
}

function getOptionalString(
  value: unknown,
) {
  return typeof value === "string"
    ? value
    : undefined;
}

function isFormStep(
  value: unknown,
): value is FormStep {
  return (
    typeof value === "number" &&
    validFormSteps.includes(
      value as FormStep,
    )
  );
}

function isStudyYear(
  value: unknown,
): value is StudyYear {
  return (
    typeof value === "string" &&
    validStudyYears.includes(
      value as StudyYear,
    )
  );
}

function isExperienceLevel(
  value: unknown,
): value is ExperienceLevel {
  return (
    typeof value === "string" &&
    validExperienceLevels.includes(
      value as ExperienceLevel,
    )
  );
}

function getStringArray(
  value: unknown,
) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string =>
      typeof item === "string",
  );
}

function sanitizeFormData(
  value: unknown,
): ApplicationFormData {
  if (!isRecord(value)) {
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

  const personalDetails = isRecord(
    value.personalDetails,
  )
    ? value.personalDetails
    : {};

  const educationAndSkills = isRecord(
    value.educationAndSkills,
  )
    ? value.educationAndSkills
    : {};

  const storedCurrentYear =
    educationAndSkills.currentYear;

  const storedExperienceLevel =
    educationAndSkills.experienceLevel;

  return {
    personalDetails: {
      firstName: getString(
        personalDetails.firstName,
      ),

      lastName: getString(
        personalDetails.lastName,
      ),

      email: getString(
        personalDetails.email,
      ),

      phoneNumber: getString(
        personalDetails.phoneNumber,
      ),

      location: getString(
        personalDetails.location,
      ),

      linkedInUrl: getOptionalString(
        personalDetails.linkedInUrl,
      ),

      portfolioUrl: getOptionalString(
        personalDetails.portfolioUrl,
      ),
    },

    educationAndSkills: {
      institution: getString(
        educationAndSkills.institution,
      ),

      degree: getString(
        educationAndSkills.degree,
      ),

      currentYear: isStudyYear(
        storedCurrentYear,
      )
        ? storedCurrentYear
        : "",

      expectedGraduationYear:
        getString(
          educationAndSkills
            .expectedGraduationYear,
        ),

      skills: getStringArray(
        educationAndSkills.skills,
      ),

      experienceLevel:
        isExperienceLevel(
          storedExperienceLevel,
        )
          ? storedExperienceLevel
          : "",

      cvFileName: getOptionalString(
        educationAndSkills.cvFileName,
      ),
    },

    termsAccepted:
      typeof value.termsAccepted ===
      "boolean"
        ? value.termsAccepted
        : false,
  };
}

export function loadStoredApplicationState():
  | StoredApplicationState
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue =
      window.localStorage.getItem(
        APPLICATION_STORAGE_KEY,
      );

    if (!storedValue) {
      return null;
    }

    const parsedValue: unknown =
      JSON.parse(storedValue);

    if (!isRecord(parsedValue)) {
      return null;
    }

    if (
      parsedValue.version !==
      STORAGE_VERSION
    ) {
      return null;
    }

    return {
      version: STORAGE_VERSION,

      currentStep: isFormStep(
        parsedValue.currentStep,
      )
        ? parsedValue.currentStep
        : 1,

      formData: sanitizeFormData(
        parsedValue.formData,
      ),
    };
  } catch {
    clearStoredApplicationState();
    return null;
  }
}

export function saveStoredApplicationState(
  state: ApplicationStateToSave,
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const storedState: StoredApplicationState =
      {
        version: STORAGE_VERSION,
        ...state,
      };

    window.localStorage.setItem(
      APPLICATION_STORAGE_KEY,
      JSON.stringify(storedState),
    );
  } catch {
    console.warn(
      "Application progress could not be saved.",
    );
  }
}

export function clearStoredApplicationState() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(
    APPLICATION_STORAGE_KEY,
  );
}