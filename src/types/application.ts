export type FormStep = 1 | 2 | 3;

export type StudyYear = "" | "1" | "2" | "3" | "4" | "5";

export type ExperienceLevel =
  | ""
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
}

export interface EducationAndSkills {
  institution: string;
  degree: string;
  currentYear: StudyYear;
  expectedGraduationYear: string;
  skills: string[];
  experienceLevel: ExperienceLevel;
  cvFileName?: string;
}

export interface ApplicationFormData {
  personalDetails: PersonalDetails;
  educationAndSkills: EducationAndSkills;
  termsAccepted: boolean;
}

export type PersonalDetailsErrors = Partial<
  Record<keyof PersonalDetails, string>
>;

export type EducationAndSkillsErrors = Partial<
  Record<keyof EducationAndSkills, string>
>;

export interface FormErrors {
  personalDetails: PersonalDetailsErrors;
  educationAndSkills: EducationAndSkillsErrors;
  termsAccepted?: string;
}