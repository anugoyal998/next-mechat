"use client";

import {
  useContext,
  useState,
  useRef,
  useCallback,
  forwardRef,
  useEffect,
} from "react";
import Input from "./ui/Input";
import { Skeleton } from "./ui/Skeleton";
import Text from "./ui/Text";
import Link from "next/link";
import * as Tooltip from "@/components/ui/Tooltip";
import Image from "next/image";

import { Loader2, Search } from "lucide-react";

import { GetUserTextResponseType } from "@/types/api.types";
import { Session } from "next-auth";
import { RouteContext } from "./Route";

import { getImageUrl } from "@/lib/utils";
import useInfiniteCursor from "@/hooks/useInfiniteCursor";
import { useFriendRequestFetch } from "@/zustand/friendRequestFetch.zustand";
import useCurrentChat from "@/zustand/currentChat.zustand";

const UsersSidebar = () => {
  const session = useContext(RouteContext);
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState("$");
  const reFetch = useFriendRequestFetch((state) => state.friendRequestFetch);
  const {
    isLoading,
    hasMore,
    data: users,
    newCursor,
  } = useInfiniteCursor<GetUserTextResponseType, any>(
    { method: "GET", url: `/api/get-user/${text ? text : "*"}/${cursor}` },
    (prev, next) => [...prev, ...next],
    cursor,
    text,
    reFetch
  );

  useEffect(() => {
    setCursor("$");
  }, [reFetch]);

  const observer = useRef();
  /**@ts-ignore */
  const lastUserElement = useCallback(
    /**@ts-ignore */
    (node) => {
      if (isLoading) return;
      /**@ts-ignore */
      if (observer.current) observer.current.disconnect();
      /**@ts-ignore */
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCursor(newCursor);
        }
      });
      /**@ts-ignore */
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <div
      className="fixed w-full md:w-[250px] bg-white border-r border-slate-300 shadow-sm overflow-y-scroll"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      <Input
        icon={
          isLoading ? (
            <Loader2 className="text-gray-500 m-2 animate-spin" />
          ) : (
            <Search className="text-gray-500 m-2" />
          )
        }
        className="m-3"
        label=""
        inputClassName="p-2"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setCursor("$");
        }}
      />
      <div className="flex flex-col space-y-3 mt-1 px-3">
        {users.length > 0 &&
          session?.user?.email &&
          users.map((user, index) =>
            session?.user?.email !== user.email ? (
              index === users.length - 1 ? (
                <UserCard
                  key={`${user.id}`}
                  user={user}
                  session={session}
                  ref={lastUserElement}
                />
              ) : (
                <UserCard key={`${user.id}`} user={user} session={session} />
              )
            ) : null
          )}
        {users.length === 0 && hasMore && <SkeletonComponent />}
        {users.length === 0 && !hasMore && <div>Nothing to Show</div>}
      </div>
    </div>
  );
};

export default UsersSidebar;

export const SkeletonComponent = () => {
  return (
    <>
      {Array.from({ length: 10 })
        .map((_, i) => i + 1)
        .map((ele) => (
          <div
            key={ele.toString()}
            className="flex items-center justify-between space-x-3 border p-2 rounded-md"
          >
            <Skeleton key={ele.toString()} className="h-14 w-14 rounded-full" />
            <div className="flex-1 flex flex-col space-y-2">
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-2 w-1/2" />
            </div>
          </div>
        ))}
    </>
  );
};

interface UserCardProps {
  user: GetUserTextResponseType;
  session: Session | null;
}

const UserCard = forwardRef(({ user, session }: UserCardProps, ref) => {
  const setCurrentChat = useCurrentChat((state) => state.setCurrentChat);
  return (
    <div
      className="border p-2 rounded-md flex space-x-2 cursor-pointer hover:bg-secondary"
      // @ts-ignore
      ref={ref}
      onClick={(e) =>
        setCurrentChat({
          email: user.email as string,
          name: user.name,
          image: user.image,
        })
      }
    >
      <Image
        src={getImageUrl(user.image, user.email)}
        alt="avatar"
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <Tooltip.TooltipProvider>
          <Tooltip.TooltipRoot>
            <Tooltip.TooltipTrigger asChild>
              <Text className="truncate font-bold">{user.email}</Text>
            </Tooltip.TooltipTrigger>
            <Tooltip.TooltipPortal>
              <Tooltip.TooltipContent>
                {user.email}
                <Tooltip.TooltipArrow />
              </Tooltip.TooltipContent>
            </Tooltip.TooltipPortal>
          </Tooltip.TooltipRoot>
        </Tooltip.TooltipProvider>
        <Text className="truncate capitalize" size="sm">
          {user.name}
        </Text>
      </div>
    </div>
  );
});
