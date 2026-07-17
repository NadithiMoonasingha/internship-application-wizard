import {
    useState,
    type KeyboardEvent,
  } from "react";
  
  import {
    FileInput,
    FormField,
    SelectInput,
    TextInput,
  } from "../form";
  
  import type { SelectOption } from "../form";
  
  import type {
    EducationAndSkills,
    EducationAndSkillsErrors,
    ExperienceLevel,
    StudyYear,
  } from "../../types/application";
  
  import "./Steps.css";
  
  interface EducationAndSkillsStepProps {
    data: EducationAndSkills;
    errors: EducationAndSkillsErrors;
    onChange: <K extends keyof EducationAndSkills>(
      field: K,
      value: EducationAndSkills[K],
    ) => void;
  }
  
  const studyYearOptions: ReadonlyArray<
    SelectOption<StudyYear>
  > = [
    {
      value: "",
      label: "Select your current year",
      disabled: true,
    },
    {
      value: "1",
      label: "Year 1",
    },
    {
      value: "2",
      label: "Year 2",
    },
    {
      value: "3",
      label: "Year 3",
    },
    {
      value: "4",
      label: "Year 4",
    },
    {
      value: "5",
      label: "Year 5",
    },
  ];
  
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
  
  const currentCalendarYear =
    new Date().getFullYear();
  
  const graduationYearOptions: ReadonlyArray<
    SelectOption<string>
  > = [
    {
      value: "",
      label: "Select expected graduation year",
      disabled: true,
    },
    ...Array.from(
      {
        length: 7,
      },
      (_, index) => {
        const year = String(
          currentCalendarYear + index,
        );
  
        return {
          value: year,
          label: year,
        };
      },
    ),
  ];
  
  function EducationAndSkillsStep({
    data,
    errors,
    onChange,
  }: EducationAndSkillsStepProps) {
    const [skillInput, setSkillInput] =
      useState("");
  
    const addSkill = () => {
      const normalizedSkill = skillInput.trim();
  
      if (!normalizedSkill) {
        return;
      }
  
      const skillAlreadyExists = data.skills.some(
        (skill) =>
          skill.toLowerCase() ===
          normalizedSkill.toLowerCase(),
      );
  
      if (!skillAlreadyExists) {
        onChange("skills", [
          ...data.skills,
          normalizedSkill,
        ]);
      }
  
      setSkillInput("");
    };
  
    const removeSkill = (
      skillToRemove: string,
    ) => {
      onChange(
        "skills",
        data.skills.filter(
          (skill) => skill !== skillToRemove,
        ),
      );
    };
  
    const handleSkillKeyDown = (
      event: KeyboardEvent<HTMLInputElement>,
    ) => {
      if (
        event.key === "Enter" ||
        event.key === ","
      ) {
        event.preventDefault();
        addSkill();
      }
    };
  
    const handleFileSelect = (
      file: File | null,
    ) => {
      onChange(
        "cvFileName",
        file?.name ?? "",
      );
    };
  
    const skillsDescribedBy =
      [
        "skills-helper",
        errors.skills ? "skills-error" : "",
      ]
        .filter(Boolean)
        .join(" ");
  
    return (
      <section
        className="form-step"
        aria-labelledby="education-skills-heading"
      >
        <header className="form-step-header">
          <p className="step-eyebrow">
            Step 2
          </p>
  
          <h2 id="education-skills-heading">
            Education and skills
          </h2>
  
          <p>
            Add your academic background,
            technical skills and CV information.
          </p>
        </header>
  
        <div className="form-grid">
          <TextInput
            id="institution"
            label="University or institution"
            value={data.institution}
            onChange={(value) =>
              onChange("institution", value)
            }
            error={errors.institution}
            type="text"
            placeholder="University of Westminster"
            autoComplete="organization"
            required
          />
  
          <TextInput
            id="degree"
            label="Degree or programme"
            value={data.degree}
            onChange={(value) =>
              onChange("degree", value)
            }
            error={errors.degree}
            type="text"
            placeholder="BSc (Hons) Computer Science"
            required
          />
  
          <SelectInput
            id="current-year"
            label="Current year of study"
            value={data.currentYear}
            options={studyYearOptions}
            onChange={(value) =>
              onChange("currentYear", value)
            }
            error={errors.currentYear}
            required
          />
  
          <SelectInput
            id="graduation-year"
            label="Expected graduation year"
            value={data.expectedGraduationYear}
            options={graduationYearOptions}
            onChange={(value) =>
              onChange(
                "expectedGraduationYear",
                value,
              )
            }
            error={
              errors.expectedGraduationYear
            }
            required
          />
  
          <div className="full-width-field">
            <FormField
              id="skills"
              label="Skills"
              error={errors.skills}
              helperText="Type a skill and press Enter, comma, or Add skill."
              required
            >
              <div className="skills-input-row">
                <input
                  id="skills"
                  className="form-control skills-input"
                  type="text"
                  value={skillInput}
                  onChange={(event) =>
                    setSkillInput(
                      event.target.value,
                    )
                  }
                  onKeyDown={
                    handleSkillKeyDown
                  }
                  placeholder="React, TypeScript, Figma..."
                  aria-invalid={
                    errors.skills
                      ? true
                      : undefined
                  }
                  aria-describedby={
                    skillsDescribedBy
                  }
                />
  
                <button
                  type="button"
                  className="add-skill-button"
                  onClick={addSkill}
                  disabled={!skillInput.trim()}
                >
                  Add skill
                </button>
              </div>
  
              {data.skills.length > 0 ? (
                <ul
                  className="skill-tags"
                  aria-label="Selected skills"
                >
                  {data.skills.map((skill) => (
                    <li
                      key={skill}
                      className="skill-tag"
                    >
                      <span>{skill}</span>
  
                      <button
                        type="button"
                        className="remove-skill-button"
                        onClick={() =>
                          removeSkill(skill)
                        }
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-skills">
                  No skills added yet.
                </p>
              )}
            </FormField>
          </div>
  
          <div className="full-width-field">
            <SelectInput
              id="experience-level"
              label="Experience level"
              value={data.experienceLevel}
              options={experienceOptions}
              onChange={(value) =>
                onChange(
                  "experienceLevel",
                  value,
                )
              }
              error={errors.experienceLevel}
              helperText="Choose the level that best represents your current experience."
              required
            />
          </div>
  
          <div className="full-width-field">
            <FileInput
              id="cv-file"
              label="Upload CV"
              fileName={data.cvFileName}
              onFileSelect={
                handleFileSelect
              }
              error={errors.cvFileName}
              helperText="Accepted formats: PDF, DOC or DOCX. Only the filename is stored temporarily."
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
        </div>
      </section>
    );
  }
  
  export default EducationAndSkillsStep;