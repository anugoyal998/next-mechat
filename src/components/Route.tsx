"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, ReactNode, createContext } from "react";
import Loading from "./Loading";
import { Session } from "next-auth";

interface RouteProps {
  children?: ReactNode;
  redirect: string;
  matchedStatus: "authenticated" | "loading" | "unauthenticated";
}

export const RouteContext = createContext<Session | null>(null);

const Route: FC<RouteProps> = ({ children, redirect, matchedStatus }) => {
  const router = useRouter();
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (status === matchedStatus) {
    router.replace(redirect);
  }

  return (
    <RouteContext.Provider value={session}>{children}</RouteContext.Provider>
  );
};

export default Route;
