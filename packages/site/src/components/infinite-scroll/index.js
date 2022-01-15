import React, {
  useEffect,
  useState,
  useRef,
} from 'react'

const isBottom = (ref) => {
  if (!ref.current) {
    return false
  }
  return ref.current.getBoundingClientRect().bottom <= window.innerHeight
}

const InfiniteScroll = ({
  onBottomHit,
  isLoading,
  hasMoreData,
  loadOnMount,
  children,
}) => {
  const [initialLoad, setInitialLoad] = useState(true)
  const contentRef = useRef(null)

  useEffect(() => {
    if (loadOnMount && initialLoad) {
      onBottomHit()
      setInitialLoad(false)
    }
  }, [onBottomHit, loadOnMount, initialLoad])

  useEffect(() => {
    const onScroll = () => {
      if (!isLoading && hasMoreData && isBottom(contentRef)) {
        onBottomHit()
      }
    }
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  }, [onBottomHit, isLoading, hasMoreData])

  return <div ref={contentRef}>{children}</div>
}

export default InfiniteScroll
