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

interface ToastProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  toastData?: ToastDataType;
}

const Toast = ({ open, onOpenChange, toastData }: ToastProps) => {
  return (
    <ToastProvider swipeDirection="right">
      <ToastRoot
        open={open}
        onOpenChange={onOpenChange}
        className={
          toastData
            ? toastData.type === "success"
              ? "bg-black"
              : "bg-red-500"
            : ""
        }
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
