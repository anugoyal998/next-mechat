import * as React from "react";
import { cn } from "../../lib/utils";
import Text from "./Text";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  isLoading?: boolean;
  isRequired?: boolean;
  inputClassName?: string;
  labelSize?: "default" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | null | undefined;
}

const Input = ({
  icon,
  className,
  inputClassName,
  label,
  labelSize,
  isRequired,
  isLoading,
  ...props
}: InputProps) => {
  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <Text size={ labelSize ? labelSize : "xl"} className="font-semibold">
        {label} {isRequired && <span>*</span>}
      </Text>
      <div className={cn("border flex rounded-md")}>
        <div className="bg-gray-100 flex justify-center items-center">
          {icon}
        </div>
        <input
          {...props}
          className={cn(
            "w-full p-3 outline-none disabled:cursor-not-allowed disabled:bg-gray-100",
            inputClassName
          )}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Input;
