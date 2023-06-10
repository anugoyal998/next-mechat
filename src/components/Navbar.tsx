"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Button, { buttonVariants } from "./ui/Button";
import SignOutButton from "./SignOutButton";
import Menu from "./Menu";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import AddFriend from "./AddFriend";
import { RouteContext } from "./Route";
import HoverCard from "./HoverCard";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShowFriendRequests from "./ShowFriendRequests";
import { GetFriendRequestType } from "@/types/api.types";
import io from "socket.io-client";
import { useToastData, useToastOpen } from "@/zustand/toast.zustand";
import { useFriendRequestFetch } from "@/zustand/friendRequestFetch.zustand";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    background: "black",
    color: "white",
  },
}));

/**@ts-ignore */
let socket;

const Navbar = () => {
  const session = useContext(RouteContext);
  const [friendRequest, setFriendRequest] = useState<GetFriendRequestType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [reFetch, setReFetch] = useFriendRequestFetch((state) => [
    state.friendRequestFetch,
    state.setFriendRequestFetch,
  ]);
  const setOpen = useToastOpen((state) => state.setOpen);
  const setToastData = useToastData((state) => state.setToastData);

  const socketInit = async () => {
    await fetch("/api/socket_io");
    /**@ts-ignore */
    socket = io(undefined, {
      path: "/api/socket_io",
    });

    const handleIncomingFriendRequest = (data: GetFriendRequestType) => {
      setFriendRequest((prev) =>
        prev.find((f) => f.sndEmail === data.sndEmail)
          ? prev
          : [{ sndEmail: data.sndEmail }, ...prev]
      );
    };
    socket.on(
      `incoming_friend_request:${session?.user?.email as string}`,
      handleIncomingFriendRequest
    );

    socket.on(
      `friend_request_updated:${session?.user?.email as string}`,
      () => {
        console.log("friend request updated");
        setReFetch((prev) => !prev);
      }
    );
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await fetch("/api/get-friend-request").then((res) =>
          res.json()
        );
        setFriendRequest(data?.data as GetFriendRequestType[]);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [reFetch]);

  useEffect(() => {
    socketInit();
    /**@ts-ignore */
    if (socket) return () => socket.disconnect();
  }, []);

  return (
    <div className="fixed backdrop-blur-sm bg-white/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link
          href="/chat"
          className={buttonVariants({
            variant: "link",
            className: "font-bold text-xl space-x-1",
          })}
        >
          <MessageCircle />
          <p>MeChat</p>
        </Link>
        <div className="md:hidden">
          {" "}
          <Menu
            isSession={session ? true : false}
            email={session?.user?.email}
          />
        </div>
        <div className="hidden md:flex gap-2">
          <Link
            href={`/profile/${session?.user?.email}`}
            className={buttonVariants({ variant: "ghost" })}
          >
            Profile
          </Link>
          <HoverCard
            cardTrigger={
              <Button variant="link">
                <Image
                  src="/add-friend.png"
                  width={28}
                  height={28}
                  alt="add-friend"
                />
              </Button>
            }
            card={
              <AddFriend
                email={session?.user?.email}
                image={session?.user?.image}
                name={session?.user?.name}
                setOpen={setOpen}
                setToastData={setToastData}
              />
            }
          />
          <HoverCard
            cardTrigger={
              <Button variant="link">
                <StyledBadge badgeContent={friendRequest.length} max={99}>
                  <Image src="/bell.png" width={28} height={28} alt="bell" />
                </StyledBadge>
              </Button>
            }
            card={
              <ShowFriendRequests
                email={session?.user?.email}
                image={session?.user?.image}
                name={session?.user?.name}
                friendRequest={friendRequest}
                recEmail={session?.user?.email}
                setReFetch={setReFetch}
              />
            }
          />
          <SignOutButton email={session?.user?.email} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
