import type {
    EducationAndSkills,
    EducationAndSkillsErrors,
    PersonalDetails,
    PersonalDetailsErrors,
  } from "../types/application";
  
  const EMAIL_PATTERN =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const CV_FILE_PATTERN =
    /\.(pdf|doc|docx)$/i;
  
  function isValidHttpUrl(value: string) {
    try {
      const url = new URL(value);
  
      return (
        url.protocol === "http:" ||
        url.protocol === "https:"
      );
    } catch {
      return false;
    }
  }
  
  export function validatePersonalDetails(
    data: PersonalDetails,
  ): PersonalDetailsErrors {
    const errors: PersonalDetailsErrors = {};
  
    const firstName = data.firstName.trim();
    const lastName = data.lastName.trim();
    const email = data.email.trim();
    const phoneNumber = data.phoneNumber.trim();
    const location = data.location.trim();
    const linkedInUrl =
      data.linkedInUrl?.trim() ?? "";
    const portfolioUrl =
      data.portfolioUrl?.trim() ?? "";
  
    if (!firstName) {
      errors.firstName =
        "Please enter your first name.";
    } else if (firstName.length < 2) {
      errors.firstName =
        "First name must contain at least 2 characters.";
    }
  
    if (!lastName) {
      errors.lastName =
        "Please enter your last name.";
    } else if (lastName.length < 2) {
      errors.lastName =
        "Last name must contain at least 2 characters.";
    }
  
    if (!email) {
      errors.email =
        "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(email)) {
      errors.email =
        "Please enter a valid email address.";
    }
  
    if (!phoneNumber) {
      errors.phoneNumber =
        "Please enter your phone number.";
    } else {
      const phoneDigits =
        phoneNumber.replace(/\D/g, "");
  
      if (
        phoneDigits.length < 7 ||
        phoneDigits.length > 15
      ) {
        errors.phoneNumber =
          "Please enter a valid phone number.";
      }
    }
  
    if (!location) {
      errors.location =
        "Please enter your location.";
    }
  
    if (
      linkedInUrl &&
      !isValidHttpUrl(linkedInUrl)
    ) {
      errors.linkedInUrl =
        "Enter a complete URL beginning with http:// or https://.";
    }
  
    if (
      portfolioUrl &&
      !isValidHttpUrl(portfolioUrl)
    ) {
      errors.portfolioUrl =
        "Enter a complete URL beginning with http:// or https://.";
    }
  
    return errors;
  }
  
  export function validateEducationAndSkills(
    data: EducationAndSkills,
  ): EducationAndSkillsErrors {
    const errors: EducationAndSkillsErrors =
      {};
  
    if (!data.institution.trim()) {
      errors.institution =
        "Please enter your university or institution.";
    }
  
    if (!data.degree.trim()) {
      errors.degree =
        "Please enter your degree or programme.";
    }
  
    if (!data.currentYear) {
      errors.currentYear =
        "Please select your current year of study.";
    }
  
    if (!data.expectedGraduationYear) {
      errors.expectedGraduationYear =
        "Please select your expected graduation year.";
    }
  
    const validSkills = data.skills.filter(
      (skill) => skill.trim().length > 0,
    );
  
    if (validSkills.length === 0) {
      errors.skills =
        "Please add at least one skill.";
    }
  
    if (!data.experienceLevel) {
      errors.experienceLevel =
        "Please select your experience level.";
    }
  
    const cvFileName =
      data.cvFileName?.trim() ?? "";
  
    if (!cvFileName) {
      errors.cvFileName =
        "Please select your CV.";
    } else if (
      !CV_FILE_PATTERN.test(cvFileName)
    ) {
      errors.cvFileName =
        "Your CV must be a PDF, DOC, or DOCX file.";
    }
  
    return errors;
  }
  
  export function validateTermsAccepted(
    accepted: boolean,
  ) {
    if (!accepted) {
      return "Please confirm that your information is accurate.";
    }
  
    return undefined;
  }
  
  export function hasValidationErrors(
    errors: object,
  ) {
    return Object.keys(errors).length > 0;
  }