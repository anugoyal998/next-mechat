"use client"

import React, { useState } from 'react'

export default function page() {
  const [first, setFirst] = useState('')
  return (
    <div>
      <input type="text" value={first} onChange={(e) => setFirst(e.target.value)} />
      {first}
    </div>
  )
}
