export type GetUserTextResponseType = {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
}

export type GetFriendRequestType = {
    sndEmail: string;
}