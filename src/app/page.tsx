"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

export default function page() {
  const { data: session } = useSession()
  return (
    <div>
    </div>
  )
}
