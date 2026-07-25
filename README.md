# Internship Application Form Wizard

A responsive three-step internship application form built with React, TypeScript and Vite.

The project demonstrates strongly typed form state, reusable components, custom validation, browser file handling, local storage persistence and responsive frontend architecture without using a backend.

![Internship Application Form Wizard](docs/screenshots/personal-details.png)

## Live Demo

A live deployment link can be added here after the project is deployed.

## Features

* Three-step internship application process
* Personal details form
* Education and skills form
* Final review and simulated submission
* Strongly typed application data
* Reusable text, select and file input components
* Custom field validation
* Previous and Next navigation
* Responsive progress indicator
* Skill tags with add and remove controls
* Duplicate-skill prevention
* CV filename preview
* Automatic progress saving with `localStorage`
* Safe restoration of saved data
* Clear form action
* Edit buttons on the review screen
* Responsive mobile, tablet and desktop layouts
* Accessible labels, error messages and keyboard focus states
* Reduced-motion support

## Screenshots

### Personal Details

![Personal Details step](docs/screenshots/personal-details.png)

### Education and Skills

![Education and Skills step](docs/screenshots/education-skills.png)

### Review and Submit

![Review and Submit step](docs/screenshots/review-submit.png)

### Submission Success

![Submission success screen](docs/screenshots/submission-success.png)

## Technologies

* React
* TypeScript
* Vite
* CSS
* HTML
* Browser Local Storage
* Git
* GitHub

## TypeScript Concepts Demonstrated

### Interfaces

Interfaces define the structure of the personal details, education details, validation errors and complete application data.

```ts
interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
}
```

### Union Types

Union types restrict values to valid options.

```ts
type FormStep = 1 | 2 | 3;

type ExperienceLevel =
  | ""
  | "Beginner"
  | "Intermediate"
  | "Advanced";
```

### Optional Properties

Optional properties are used for information that is not required.

```ts
linkedInUrl?: string;
portfolioUrl?: string;
cvFileName?: string;
```

### Typed React State

The application data and active form step are strongly typed.

```ts
const [currentStep, setCurrentStep] =
  useState<FormStep>(1);

const [formData, setFormData] =
  useState<ApplicationFormData>(
    initialApplicationData,
  );
```

### Typed Component Props

Reusable components define exactly which values and handlers they accept.

```ts
interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
```

### Typed React Events

Input, keyboard, file and form events are typed using React event types.

```ts
const handleChange = (
  event: ChangeEvent<HTMLInputElement>,
) => {
  onChange(event.target.value);
};
```

### Generic Components

The reusable select component uses a generic type to support different union values safely.

```ts
function SelectInput<T extends string>(
  props: SelectInputProps<T>,
) {
  // ...
}
```

### Typed Nested State Updates

Generic update functions connect field names to their correct value types.

```ts
function updatePersonalField<
  K extends keyof PersonalDetails,
>(
  field: K,
  value: PersonalDetails[K],
) {
  // ...
}
```

### Runtime Validation

Data restored from `localStorage` is treated as unknown and checked before being used.

This prevents invalid, outdated or corrupted stored data from breaking the application.

## Project Structure

```text
src/
├── components/
│   ├── form/
│   │   ├── FileInput.tsx
│   │   ├── FormControls.css
│   │   ├── FormField.tsx
│   │   ├── SelectInput.tsx
│   │   ├── TextInput.tsx
│   │   └── index.ts
│   └── steps/
│       ├── EducationAndSkillsStep.tsx
│       ├── PersonalDetailsStep.tsx
│       ├── ReviewAndSubmitStep.tsx
│       ├── Steps.css
│       └── index.ts
├── data/
│   └── initialFormData.ts
├── types/
│   └── application.ts
├── utils/
│   ├── storage.ts
│   └── validation.ts
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

## Getting Started

### Prerequisites

Install:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone https://github.com/NadithiMoonasingha/internship-application-wizard.git
```

Enter the project folder:

```bash
cd internship-application-wizard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address shown in the terminal.

It will usually resemble:

```text
http://localhost:5173
```

## Available Commands

Start the development server:

```bash
npm run dev
```

Check the project with ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Validation Rules

### Personal Details

* First name is required
* Last name is required
* Email must use a valid format
* Phone number must contain a valid number of digits
* Location is required
* LinkedIn URL is optional but must be a complete URL when entered
* Portfolio URL is optional but must be a complete URL when entered

### Education and Skills

* Institution is required
* Degree or programme is required
* Current study year is required
* Expected graduation year is required
* At least one skill is required
* Experience level is required
* CV selection is required
* CV filename must end with `.pdf`, `.doc` or `.docx`

## Local Storage

Application progress is saved automatically in the browser using `localStorage`.

The saved state includes:

* Personal details
* Education details
* Skills
* CV filename
* Confirmation status
* Current form step

The actual CV file is not stored.

Browsers do not allow a selected file to be automatically restored into a file input after a refresh. Only the filename is preserved for demonstration purposes.

Saved data is removed when:

* The user clears the form
* The application is submitted successfully

## Accessibility

The project includes:

* Connected labels and form controls
* Keyboard-accessible buttons
* Visible focus indicators
* Accessible helper text
* Error messages using `aria-describedby`
* Invalid states using `aria-invalid`
* Alert roles for validation feedback
* Responsive touch targets
* Reduced-motion support

## Responsive Design

The application is designed for:

* Desktop screens
* Tablets
* Mobile devices
* Small screens starting at approximately 320px

The layout uses CSS Grid, Flexbox, fluid sizing and media queries.

## Current Limitations

* No backend or database is connected
* Submission is simulated
* The actual CV file is not uploaded or saved
* Data is stored only in the current browser
* Browser local storage should not be used for highly sensitive information in a production application
* Automated tests have not yet been added

## Future Improvements

* Add React Testing Library tests
* Add unit tests for validation and storage utilities
* Add drag-and-drop CV upload
* Add file size validation
* Add a real backend API
* Add authentication
* Add server-side file storage
* Add a dashboard for submitted applications
* Add deployment using Vercel, Netlify or GitHub Pages

## Git Workflow

The project was developed using feature branches and pull requests.

Examples include:

```text
feature/form-types
feature/reusable-inputs
feature/personal-details
feature/education-skills
feature/review-submit
feature/form-validation
feature/local-storage
feature/responsive-design
docs/readme
```

Each feature was developed separately, tested and merged into `main`.

## Author

Nadithi Moonasingha

Computer Science undergraduate interested in frontend development and UI/UX design.

## Licence

This project is available for learning and portfolio demonstration purposes.
