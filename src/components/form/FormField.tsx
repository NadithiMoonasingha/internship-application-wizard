import type { ReactNode } from "react";
import "./FormControls.css";

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactNode;
  error?: string;
  helperText?: string;
  required?: boolean;
}

function FormField({
  id,
  label,
  children,
  error,
  helperText,
  required = false,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>
        {label}

        {required && (
          <span className="required-indicator" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}

      {helperText && (
        <p className="form-helper" id={`${id}-helper`}>
          {helperText}
        </p>
      )}

      {error && (
        <p className="form-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;