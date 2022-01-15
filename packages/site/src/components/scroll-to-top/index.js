import React from 'react'
import { makeStyles } from '@mui/styles'
import {
  Button,
  useScrollTrigger,
  Zoom,
} from '@mui/material'
import { Navigation } from '@mui/icons-material'

import styles from './styles'

const useStyles = makeStyles(styles)

const ScrollToTop = () => {
  const classes = useStyles()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })
  const handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth', block: 'center' })
  }

  return (
    <Zoom in={trigger}>
      <div
        className={classes.btnUpContent}
        role="presentation"
      >
        <Button
          onClick={handleClickToTop}
          variant="outlined"
          color="special"
          className={classes.floatBtn}
        >
          <Navigation className={classes.iconFloatBtn} />
        </Button>
      </div>
    </Zoom>
  )
}

export default ScrollToTop
