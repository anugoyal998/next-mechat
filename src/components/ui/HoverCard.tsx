"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

const HoverCardRoot = HoverCardPrimitive.Root;
HoverCardRoot.displayName = HoverCardPrimitive.Root.displayName;

const HoverCardTrigger = HoverCardPrimitive.Trigger;
HoverCardTrigger.displayName = HoverCardPrimitive.Trigger.displayName;

const HoverCardPortal = HoverCardPrimitive.Portal;
HoverCardPortal.displayName = HoverCardPrimitive.Portal.displayName;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {}
>(({ className, children, ...props }, ref) => (
  <HoverCardPrimitive.Content
    className={cn(
      "data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all",
      className
    )}
    sideOffset={5}
    {...props}
    ref={ref}
  >
    {children}
  </HoverCardPrimitive.Content>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

const HoverCardArrow = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Arrow> & {}
>(({ className, ...props }, ref) => (
  <HoverCardPrimitive.Arrow
    className={cn("fill-white", className)}
    {...props}
    ref={ref}
  />
));
HoverCardArrow.displayName = HoverCardPrimitive.Arrow.displayName;

export {
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardPortal,
  HoverCardContent,
  HoverCardArrow,
};
