import { create } from "zustand";

export const useChatFetch = create<UseChatFetchType>((set) => ({
  chatFetch: false,
  setChatFetch: (fn: (prev: boolean) => boolean) =>
    set((state: any) => ({ chatFetch: fn(state.chatFetch) })),
}));

type UseChatFetchType = {
  chatFetch: boolean;
  setChatFetch: (fn: (prev: boolean) => boolean) => void;
};
