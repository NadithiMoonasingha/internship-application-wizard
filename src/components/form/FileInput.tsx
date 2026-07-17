import type { ChangeEvent } from "react";
import FormField from "./FormField";

interface FileInputProps {
  id: string;
  label: string;
  fileName?: string;
  onFileSelect: (file: File | null) => void;
  error?: string;
  helperText?: string;
  accept?: string;
  required?: boolean;
}

function FileInput({
  id,
  label,
  fileName,
  onFileSelect,
  error,
  helperText,
  accept,
  required = false,
}: FileInputProps) {
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile =
      event.target.files?.[0] ?? null;

    onFileSelect(selectedFile);
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
        id={id}
        className="file-control"
        type="file"
        accept={accept}
        onChange={handleFileChange}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />

      <div
        className={`file-preview ${
          fileName ? "file-preview-selected" : ""
        }`}
        aria-live="polite"
      >
        <span className="file-preview-label">
          Selected CV
        </span>

        <strong>
          {fileName || "No CV selected"}
        </strong>
      </div>
    </FormField>
  );
}

export default FileInput;