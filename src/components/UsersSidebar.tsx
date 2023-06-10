"use client";

import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import Input from "./ui/Input";
import { Loader2, Search } from "lucide-react";
import { GetUserTextResponseType } from "@/types/api.types";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Skeleton } from "./ui/Skeleton";
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from "@/components/ui/ScrollArea";
import Text from "./ui/Text";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { RouteContext } from "./Route";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface UsersSidebarProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  users: GetUserTextResponseType[];
  setUsers: Dispatch<SetStateAction<GetUserTextResponseType[]>>;
}

const UsersSidebar: FC<UsersSidebarProps> = ({
  text,
  setText,
  isLoading,
  setIsLoading,
  users,
  setUsers,
}) => {
  const session = useContext(RouteContext);
  const [cursor, setCursor] = useState<string>("$");
  const observer = useRef();
  /**@ts-ignore */
  const lastUserElement = useCallback((node) => {
    if(isLoading)return
    /**@ts-ignore */
    if(observer.current)observer.current.disconnect();
    /**@ts-ignore */
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        // console.log('visible') // change cursor
      }
    })
    /**@ts-ignore */
    if(node)observer.current.observe(node);

    console.log(node)
  },[isLoading]);

  useEffect(() => {
    const getData = setTimeout(async () => {
      // fetch
      try {
        setIsLoading(true);
        const { data } = await fetch(
          `/api/get-user/${text ? text : "*"}/${cursor}`
        ).then((res) => res.json());
        const userData = data as GetUserTextResponseType[];
        setUsers((prev) => [...prev, ...userData]);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(getData);
  }, [text]);

  return (
    <div
      className="fixed w-[250px] bg-white border-r border-slate-300 shadow-sm"
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
          setUsers([]);
        }}
      />
      <ScrollAreaRoot className="w-full h-full">
        <ScrollAreaViewport>
          <div className="flex flex-col space-y-3 mt-1 px-3">
            {users.length > 0 &&
              session?.user?.email &&
              users.map((user, index) =>
                session?.user?.email !== user.email ? (
                  index === users.length - 1 ? (
                    <Link
                      key={`${user.id}`}
                      href={`/chat/${session.user?.email}/${user.email}`}
                       /**@ts-ignore */
                      ref={lastUserElement}
                    >
                      <div className="border p-2 rounded-md flex space-x-2 cursor-pointer hover:bg-secondary">
                        <Image
                          src={getImageUrl(user.image, user.email)}
                          alt="avatar"
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="flex-1 flex flex-col justify-center overflow-hidden">
                          <Text className="truncate font-bold">
                            {user.email}
                          </Text>
                          <Text className="truncate capitalize" size="sm">
                            {user.name}
                          </Text>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      key={`${user.id}`}
                      href={`/chat/${session.user?.email}/${user.email}`}
                    >
                      <div className="border p-2 rounded-md flex space-x-2 cursor-pointer hover:bg-secondary">
                        <Image
                          src={getImageUrl(user.image, user.email)}
                          alt="avatar"
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="flex-1 flex flex-col justify-center overflow-hidden">
                          <Text className="truncate font-bold">
                            {user.email}
                          </Text>
                          <Text className="truncate capitalize" size="sm">
                            {user.name}
                          </Text>
                        </div>
                      </div>
                    </Link>
                  )
                ) : null
              )}
            {users.length === 0 &&
              Array.from({ length: 10 })
                .map((_, i) => i + 1)
                .map((ele) => (
                  <div
                    key={ele.toString()}
                    className="flex items-center justify-between space-x-3 border p-2 rounded-md"
                  >
                    <Skeleton
                      key={ele.toString()}
                      className="h-14 w-14 rounded-full"
                    />
                    <div className="flex-1 flex flex-col space-y-2">
                      <Skeleton className="h-2 w-full" />
                      <Skeleton className="h-2 w-1/2" />
                    </div>
                  </div>
                ))}
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRoot>
    </div>
  );
};

export default UsersSidebar;
