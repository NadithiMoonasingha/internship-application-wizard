import type {
    ChangeEvent,
    SelectHTMLAttributes,
  } from "react";
  
  import FormField from "./FormField";
  
  export interface SelectOption<T extends string> {
    value: T;
    label: string;
    disabled?: boolean;
  }
  
  type NativeSelectProps = Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "id" | "value" | "onChange" | "required" | "children"
  >;
  
  interface SelectInputProps<T extends string>
    extends NativeSelectProps {
    id: string;
    label: string;
    value: T;
    options: ReadonlyArray<SelectOption<T>>;
    onChange: (value: T) => void;
    error?: string;
    helperText?: string;
    required?: boolean;
  }
  
  function SelectInput<T extends string>({
    id,
    label,
    value,
    options,
    onChange,
    error,
    helperText,
    required = false,
    ...selectProps
  }: SelectInputProps<T>) {
    const handleChange = (
      event: ChangeEvent<HTMLSelectElement>,
    ) => {
      onChange(event.target.value as T);
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
        <select
          {...selectProps}
          id={id}
          className="form-control"
          value={value}
          onChange={handleChange}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    );
  }
  
  export default SelectInput;