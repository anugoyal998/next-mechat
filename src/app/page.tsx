import Route from '@/components/Route'
import React from 'react'

export default function page() {
  return (
    <Route matchedStatus='unauthenticated' redirect='/auth/signin' >
      <p>anubhav</p>
    </Route>
  )
}
