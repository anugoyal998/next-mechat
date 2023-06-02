import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitive.Provider;
ToastProvider.displayName = ToastPrimitive.Provider.displayName;

const ToastRoot = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {}
>(({ className, children, ...props }, ref) => (
  <ToastPrimitive.Root
    className={cn(
      "bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut",
      className
    )}
    {...props}
    ref={ref}
  >
    {children}
  </ToastPrimitive.Root>
));
ToastRoot.displayName = ToastPrimitive.Root.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> & {}
>(({ className, children, ...props }, ref) => (
  <ToastPrimitive.Title
    className={cn(
      "[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]",
      className
    )}
    {...props}
    ref={ref}
  >
    {children}
  </ToastPrimitive.Title>
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> & {}
>(({ children, ...props }, ref) => (
  <ToastPrimitive.Description asChild {...props} ref={ref}>
    {children}
  </ToastPrimitive.Description>
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> & {}
>(({ className, children, ...props }, ref) => (
  <ToastPrimitive.Action
    className={cn("[grid-area:_action]", className)}
    asChild
    {...props}
    ref={ref}
  >
    {children}
  </ToastPrimitive.Action>
));
ToastAction.displayName = ToastPrimitive.Action.displayName;

const ToastClose = ToastPrimitive.Close
ToastClose.displayName = ToastPrimitive.Close.displayName;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> & {}
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    className={cn(
      "[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none",
      className
    )}
    {...props}
    ref={ref}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export { 
    ToastProvider,
    ToastRoot,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastClose,
    ToastViewport
}
