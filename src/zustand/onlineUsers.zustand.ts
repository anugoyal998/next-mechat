import { create } from "zustand";

const useOnlineUsers = create<UseOnlineUsersType>((set) => ({
    onlineUsers: [],
    setOnlineUsers: (onlineUsers) => set((state: any) => ({ onlineUsers }))
}))

export type OnlineUserType = {
    email: string;
    socketId: string;
    name: string | null;
    image: string | null;
}

type UseOnlineUsersType = {
    onlineUsers: OnlineUserType[];
    setOnlineUsers: (onlineUsers: OnlineUserType[]) => void;
}

export default useOnlineUsers;