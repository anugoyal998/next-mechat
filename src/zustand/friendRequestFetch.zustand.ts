import { create } from "zustand";

export const useFriendRequestFetch = create<UseFriendRequestFetchType>((set) => ({
  friendRequestFetch: false,
  setFriendRequestFetch: (fn: (prev: boolean) => boolean) =>
    set((state: any) => ({ friendRequestFetch: fn(state.friendRequestFetch) })),
}));

type UseFriendRequestFetchType = {
  friendRequestFetch: boolean;
  setFriendRequestFetch: (fn: (prev: boolean) => boolean) => void;
};
