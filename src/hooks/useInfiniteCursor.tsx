import React, { useState, useEffect } from 'react'
import axios, { Canceler, AxiosRequestConfig } from 'axios';

export default function useInfiniteCursor<DataType, AxiosResponseType>(axiosConfig: AxiosRequestConfig<AxiosResponseType>,cursor: string,...args: any[]) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState<DataType[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [newCursor, setNewCursor] = useState('$')

  useEffect(() => {
    setData([])
    setNewCursor('$')
  },[...args])

  useEffect(() => {
    setIsLoading(true)
    setError(false)
    let cancel: Canceler;
    axios({
        ...axiosConfig,
        cancelToken: new axios.CancelToken((c) => cancel = c),  
    }).then((res) => {
        const resData = res.data?.data as DataType[]
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
  },[cursor,...args])

  return { isLoading, error, data, hasMore, newCursor }
}
