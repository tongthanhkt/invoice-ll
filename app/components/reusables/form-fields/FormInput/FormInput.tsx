"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import styles from "./styles.module.scss";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormInputProps = {
  name: string;
  label?: string;
  labelHelper?: string;
  placeholder?: string;
  vertical?: boolean;
  type?: string;
} & InputProps;

const FormInput = ({
  name,
  label,
  labelHelper,
  placeholder,
  vertical = true,
  type,
  ...props
}: FormInputProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderInput = (field: any) => (
    <div className="relative w-full">
      <Input
        {...field}
        placeholder={placeholder}
        className={`${styles.input__field} text-sm sm:text-base h-9 sm:h-10 ${
          type === "password" ? "pr-10" : ""
        }`}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...props}
      />
      {type === "password" && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <div
            className={`${styles.input} ${
              vertical ? "w-full" : "sm:flex-row sm:items-center sm:gap-4"
            }`}
          >
            {label && (
              <FormLabel
                className={`${
                  vertical ? styles.input__label : "flex-shrink-0 sm:w-1/3"
                } truncate`}
              >
                {vertical ? label : `${label}:`}
              </FormLabel>
            )}
            {labelHelper && (
              <span className="text-label text-neutral-500 truncate">
                {" "}
                {labelHelper}
              </span>
            )}

            <div className={`${!vertical && "flex-1"} w-full`}>
              <FormControl>{renderInput(field)}</FormControl>
              <FormMessage className="text-label sm:text-sm" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
