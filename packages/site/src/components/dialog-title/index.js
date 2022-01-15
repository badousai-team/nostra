import React from 'react'
import { makeStyles } from '@mui/styles'
import {
  DialogTitle,
  IconButton,
  Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import styles from './styles'

const useStyles = makeStyles(styles)

const CustomizedDialogTitle = (props) => {
  const {
    children,
    onClose,
    onReset,
    ...other
  } = props
  const classes = useStyles()

  return (
    <DialogTitle
      className={classes.root}
      {...other}
    >
      {children}
      {!!onReset && (
        <Button
          className={classes.resetButton}
          color="secondary"
          variant="contained"
          onClick={onReset}
        >
          Reset
        </Button>
      )}
      {!!onClose && (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  )
}

export default CustomizedDialogTitle
