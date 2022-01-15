import React from 'react'
import {
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import clx from 'clsx'

import styles from './styles'

const useStyles = makeStyles(styles)

const TypographyDiv = ({ children, className }) => {
  const classes = useStyles()

  return (
    <Typography
      variant="body1"
      component="div"
      variantMapping={{ body1: 'div' }}
      className={clx(classes.textWrapper, className)}
      paragraph={false}
    >
      {children}
    </Typography>
  )
}

export default TypographyDiv
