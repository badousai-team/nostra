import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const NotificationBar = (props) => {
  const autoHideDuration = props.autoHideDuration || 6000

  if (!props.message) return null

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={autoHideDuration}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert
        onClose={props.onClose}
        severity={props.severity}
        style={{ minWidth: '300px' }}
      >
        <span>
          {props.message}
        </span>
      </Alert>
    </Snackbar>
  )
}

export default NotificationBar
