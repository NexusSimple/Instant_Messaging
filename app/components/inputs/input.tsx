"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input = ({
  label,
  id,
  type = "text", // Default of "text"
  required,
  register,
  errors,
  disabled,
}: InputProps) => {
  return <div>Input</div>;
};

export default Input;
