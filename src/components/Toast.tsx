"use client";

import { ToastDataType } from "@/types";
import {
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastViewport,
} from "./ui/RadixToast";
import { useToastData, useToastOpen } from "@/zustand/toast.zustand";

// interface ToastProps {
//   open?: boolean;
//   onOpenChange?: (open: boolean) => void;
//   toastData?: ToastDataType;
// }

const Toast = () => {
  const [open, setOpen] = useToastOpen((state) => [state.open, state.setOpen]);
  const toastData = useToastData((state) => state.toastData);
  return (
    <ToastProvider swipeDirection="right">
      <ToastRoot
        open={open}
        onOpenChange={setOpen}
        className={`${toastData?.type === "success" && "bg-black"} ${toastData?.type === "error" && "bg-red-500"}`}
      >
        <ToastTitle className={toastData ? "text-white" : "text-black"}>
          {toastData?.text}
        </ToastTitle>
      </ToastRoot>
      <ToastViewport />
    </ToastProvider>
  );
};

export default Toast;
