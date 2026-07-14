import type {
    ApplicationFormData,
    FormErrors,
  } from "../types/application";
  
  export const initialApplicationData: ApplicationFormData = {
    personalDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      location: "",
    },
  
    educationAndSkills: {
      institution: "",
      degree: "",
      currentYear: "",
      expectedGraduationYear: "",
      skills: [],
      experienceLevel: "",
    },
  
    termsAccepted: false,
  };
  
  export const initialFormErrors: FormErrors = {
    personalDetails: {},
    educationAndSkills: {},
  };