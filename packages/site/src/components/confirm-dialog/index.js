import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'

const ConfirmDialog = (props) => {
  const {
    open,
    title,
    content,
    onClose,
    onAccept,
  } = props

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={open}
      onClose={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          onClick={(event) => {
            event.preventDefault()
            onAccept()
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
