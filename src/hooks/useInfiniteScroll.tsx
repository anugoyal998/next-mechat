import { GetUserTextResponseType } from '@/types/api.types';
import axios, { Canceler } from 'axios';
import React, { useState, useEffect } from 'react'

export default function useInfiniteScroll(text: string,cursor: string) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState<GetUserTextResponseType[]>([])
    const [hasMore, setHasMore] = useState(false)
    const [newCursor, setNewCursor] = useState('$')

    useEffect(() => {
        setData([])
        setNewCursor('$')
    },[text])

    useEffect(() => {
        setIsLoading(true)
        setError(false)
        let cancel: Canceler;
        axios({
            method: 'GET',
            url: `/api/get-user/${text ? text : "*"}/${cursor}`,
            cancelToken: new axios.CancelToken((c) => cancel = c)    
        }).then((res) => {
            const resData = res.data?.data as GetUserTextResponseType[]
            const resCursor = res.data?.lastCursor as string
            setData((prev) => [...prev, ...resData])
            setNewCursor(resCursor)
            if(resCursor === "@")setHasMore(false)
            else setHasMore(true)
        }).catch((e) => {
            if(axios.isCancel(e))return
            setError(true)
        }).finally(() => {
            setIsLoading(false)
        })
        return () => cancel()
    },[text, cursor])

  return { isLoading, error, data, hasMore, newCursor }
}
