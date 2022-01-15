import {
  useEffect, useRef, useState, useContext, useCallback,
} from 'react'

import errorHandler from 'site/services/error-handler'
import { StoreContext } from 'site/contexts'

export const useStores = () => useContext(StoreContext)

// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
export const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}

export const useRequest = (api, {
  initialData = null,
  transformData = (d) => d,
  handleError = () => null,
  concurrent = false,
  defaultLoading = false,
  silentFail = false,
}) => {
  const [payload, setPayload] = useState(null)
  const [response, setResponse] = useState(null)
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(defaultLoading)
  // To make sure request is always fired, even with same payload
  const [timestamp, setTimeStamp] = useState(null)

  useEffect(() => {
    let didCancel = false

    async function fetchData() {
      if (!timestamp || (!concurrent && loading)) return
      setLoading(true)
      try {
        const res = await api(payload)
        if (didCancel) return
        if (res.ok) {
          setResponse(res)
          setData(transformData(res.data))
        } else {
          throw errorHandler(res, { silentFail })
        }
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => { didCancel = true }
  }, [payload, timestamp])

  const request = useCallback((p = null) => {
    setPayload(p)
    setTimeStamp(new Date().getTime())
  }, [])

  return {
    response, data, loading, request,
  }
}

// https://medium.com/better-programming/react-state-management-in-2020-719d10c816bf
export const useApiRequest = (api, {
  blocking = false, // set to true, if dont allow concurrent request
  silentFail = false, // set to true, if dont want to use global notification error bar
  initialData = null, // set default initial data
  transformData = (d) => d, // custom transform data logic
  defaultLoading = false,
}) => {
  const [isLoading, setLoading] = useState(defaultLoading)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState({ data: initialData })
  const [data, setData] = useState(initialData)

  const request = useCallback(async (...params) => {
    if (blocking && isLoading) return null
    setLoading(true)
    setError(null)
    try {
      const resp = await api(...params)
      if (resp.ok) {
        setResponse(resp)
        setData(transformData(resp.data))
        return resp
      }
      throw errorHandler(resp, { silentFail })
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
    return null
  }, [])

  return {
    isLoading, error, data, response, request,
  }
}

export function useOnScreen(ref, rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      },
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref && ref.current) observer.unobserve(ref.current)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting
}
