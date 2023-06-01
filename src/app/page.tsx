import Navbar from '@/components/Navbar'
import Route from '@/components/Route'
import UsersSidebar from '@/components/UsersSidebar'
import Chat from '@/components/chat/Chat'
import React from 'react'

export default function page() {
  return (
    <Route matchedStatus='unauthenticated' redirect='/auth/signin' >
      <div className='min-h-screen bg-secondary'>
        {/* @ts-expect-error Server Component */}
        <Navbar />
        <div className='pt-20 relative'>
          <UsersSidebar />
          <Chat />
        </div>
      </div>
    </Route>
  )
}
