import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

export const centerContainerVariants = cva(
  "border-2 rounded-md shadow-md bg-white",
  {
    variants: {
      variant: {
        default: "",
        flex: "flex flex-col justify-center items-center",
      },
      size: {
        default: "px-5 py-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface CenterContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof centerContainerVariants> {}

const CenterContainer = React.forwardRef<HTMLDivElement, CenterContainerProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(centerContainerVariants({ variant, size, className }))}
      >
        {children}
      </div>
    );
  }
);

export default CenterContainer;
