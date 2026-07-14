import type {
    ChangeEvent,
    InputHTMLAttributes,
  } from "react";
  
  import FormField from "./FormField";
  
  type NativeInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "value" | "onChange" | "required"
  >;
  
  interface TextInputProps extends NativeInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    helperText?: string;
    required?: boolean;
  }
  
  function TextInput({
    id,
    label,
    value,
    onChange,
    error,
    helperText,
    required = false,
    ...inputProps
  }: TextInputProps) {
    const handleChange = (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      onChange(event.target.value);
    };
  
    const describedBy =
      [
        helperText ? `${id}-helper` : "",
        error ? `${id}-error` : "",
      ]
        .filter(Boolean)
        .join(" ") || undefined;
  
    return (
      <FormField
        id={id}
        label={label}
        error={error}
        helperText={helperText}
        required={required}
      >
        <input
          {...inputProps}
          id={id}
          className="form-control"
          value={value}
          onChange={handleChange}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
      </FormField>
    );
  }
  
  export default TextInput;