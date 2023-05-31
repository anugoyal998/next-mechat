import Navbar from '@/components/Navbar'
import Route from '@/components/Route'
import React from 'react'

export default function page() {
  return (
    <Route matchedStatus='unauthenticated' redirect='/auth/signin' >
      <div className='min-h-screen bg-secondary'>
        {/* @ts-expect-error Server Component */}
        <Navbar />
      </div>
    </Route>
  )
}
