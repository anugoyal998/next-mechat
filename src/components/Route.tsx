"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'
import Loading from './Loading'

interface RouteProps {
    children?: ReactNode;
    redirect: string;
    matchedStatus: "authenticated" | "loading" | "unauthenticated"
}

const Route: FC<RouteProps> = ({ children, redirect, matchedStatus }) => {
    const router = useRouter()
    const { status } = useSession()

    if(status === "loading"){
        return <Loading />
    }

    if(status === matchedStatus){
        router.replace(redirect)
    }

  return <>
    {children}
  </>
}

export default Route