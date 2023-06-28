import { create } from "zustand";

const useCurrentChat = create<UseCurrentChatType>((set) => ({
  currentChat: null,
  setCurrentChat: (currentChat) =>
    set((state: any) => ({ currentChat })),
}));

export type CurrentChatType = {
  name: string | null;
  email: string;
  image: string | null;
} | null;

type UseCurrentChatType = {
  currentChat: CurrentChatType;
  setCurrentChat: (currentChat: CurrentChatType) => void;
};

export default useCurrentChat