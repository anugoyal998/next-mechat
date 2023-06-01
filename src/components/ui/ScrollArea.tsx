import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

const ScrollAreaRoot = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {}
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    className={cn(
      "rounded overflow-hidden bg-white",
      className
    )}
    ref={ref}
    {...props}
  ></ScrollAreaPrimitive.Root>
));
ScrollAreaRoot.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollAreaViewport = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport> & {}
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Viewport
    className={cn("w-full h-full rounded", className)}
    ref={ref}
    {...props}
  ></ScrollAreaPrimitive.Viewport>
));
ScrollAreaViewport.displayName = ScrollAreaPrimitive.Viewport.displayName

const ScrollAreaScrollbar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar> & {}
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    className={cn(
      "flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5",
      className
    )}
    orientation="vertical"
    ref={ref}
    {...props}
  ></ScrollAreaPrimitive.Scrollbar>
));
ScrollAreaScrollbar.displayName = ScrollAreaPrimitive.Scrollbar.displayName

const ScrollAreaThumb = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Thumb> & {}
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Thumb
    className={cn(
      "flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]",
      className
    )}
    ref={ref}
    {...props}
  />
));
ScrollAreaThumb.displayName = ScrollAreaPrimitive.Thumb.displayName

const ScrollAreaCorner = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Corner>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Corner> & {}
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Corner
    className={cn("bg-blackA8", className)}
    ref={ref}
    {...props}
  />
));
ScrollAreaCorner.displayName = ScrollAreaPrimitive.Corner.displayName

export { 
    ScrollAreaRoot,
    ScrollAreaViewport,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaCorner
}