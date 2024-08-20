"use client";

import { FormikHandlers } from "formik";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FC } from "react";
import { Textarea } from "./ui/textarea";

interface FormTextareaProps {
  name: string;
  label: string;
  placeholder: string;
  value: any;
  error: string | undefined;
  isError: boolean;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
}

const FormTextarea: FC<FormTextareaProps> = ({
  name,
  label,
  placeholder,
  value,
  error,
  isError,
  onBlur,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        name={name}
        placeholder={placeholder}
        value={value}
        style={{ resize: "none" }}
        rows={4}
        onBlur={onBlur}
        onChange={onChange}
      />
      {isError ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

export default FormTextarea;
