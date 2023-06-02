import { ToastDataType } from "@/types";
import { create } from "zustand";

export const useToastOpen = create<UseToastOpenType>((set) => ({
  open: false,
  setOpen: (open: boolean) => set((state: any) => ({ open })),
}));

type UseToastOpenType = {
    open: boolean
    setOpen: (open: boolean) => void
}

export const useToastData = create<UseToastDataType>((set) => ({
  toastData: undefined,
  setToastData: (toastData: ToastDataType | undefined) =>
    set((state: any) => ({ toastData })),
}));

type UseToastDataType = {
    toastData: ToastDataType | undefined
    setToastData: (toastData: ToastDataType | undefined) => void
}

