import * as React from "react";
import { cn } from "../../lib/utils";
import Text from "./Text";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  label: string;
  isLoading?: boolean;
  isRequired?: boolean;
}

const Input = ({ icon, className, label, isRequired, isLoading, ...props }: InputProps) => {
  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <Text size="xs" className="font-semibold">
        {label} {isRequired && <span className="text-primary">*</span>}
      </Text>
      <div className={cn("border flex rounded-md")}>
        <div className="bg-gray-100 flex justify-center items-center">
          {icon}
        </div>
        <input
          {...props}
          className="w-full p-3 outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Input;
