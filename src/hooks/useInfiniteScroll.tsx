import React, { useState, useEffect } from 'react'

export default function useInfiniteScroll(text: string,cursor: string) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [first, setfirst] = useState(second)
    useEffect(() => {
        (async () => {
            try {
                const { data} = await fetch(`/api/get-user/${text ? text : "*"}/${cursor}`).then(
                    (res) => res.json()
                );

            } catch (err) {} finally {}
        })()
    },[text,cursor])
  return null
}
