import { useCallback, useState } from 'react'

export function useApiCall<T extends any[], R>(apiFn: (...args: T) => Promise<R>) {
  const [data, setData] = useState<R | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any | null>(null)

  const call = useCallback(async (...args: T) => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFn(...args)
      setData(res)
      return res
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiFn])

  return { data, setData, loading, error, call }
}
