import React, { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { makeStyles } from '@mui/styles'
import clx from 'clsx'

import styles from './styles'

const useStyles = makeStyles(styles)

const Page = ({ children, lockScroll = false, className }) => {
  const prevLocation = useRef()
  const classes = useStyles({ lockScroll })
  const location = useLocation()

  // Start the page on the top when a page change
  useEffect(() => {
    if (prevLocation.current !== location.pathname) {
      window.scrollTo(0, 0)
      prevLocation.current = location.pathname
    }
  }, [location])

  return (
    <div
      className={clx(classes.page, className)}
    >
      {children}
    </div>
  )
}

export default Page
