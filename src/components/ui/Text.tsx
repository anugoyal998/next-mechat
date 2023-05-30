import * as React from "react";
import { cn } from "../../lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-black",
      primary: "text-primary",
      primaryBold: "text-primary font-bold",
      ghost: "text-gray-500"
    },
    size: {
      default: "text-base",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface TextProps
  extends React.ParamHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <p
        className={cn(textVariants({ variant, size, className }))}
        {...props}
        ref={ref}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = "Text";

export default Text;
