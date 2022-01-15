import React from 'react'
import {
  CircularProgress,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import clx from 'clsx'

import CustomizedDialogTitle from 'site/components/dialog-title'
import styles from './styles'

const useStyles = makeStyles(styles)

const CustomDialog = ({
  size = 'sm',
  open = false,
  title,
  titleStyle,
  content,
  onClose,
  onAccept,
  primaryActionLabel = 'OK',
  loading = false,
  noButton,
  fullScreen = false,
  classesContainer,
  classesContent,
  disableEscapeKeyDown = false,
  noCloseBtn = false,
  noBackdropClick = false,
  fullWidth = false,
  btnFullWidth = true,
}) => {
  const classes = useStyles()

  return (
    <Dialog
      maxWidth={size}
      fullWidth={fullWidth}
      open={open}
      fullScreen={fullScreen}
      onClose={(event, reason) => {
        event.preventDefault()
        if (noBackdropClick) {
          if (reason !== 'backdropClick') {
            onClose()
          }
        } else {
          onClose()
        }
      }}
      classes={classesContainer}
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      <CustomizedDialogTitle
        onClose={noCloseBtn ? null : onClose}
        style={titleStyle}
      >
        {title}
      </CustomizedDialogTitle>
      <DialogContent
        sx={{ marginBottom: '1.5rem' }}
        className={classesContent}
      >
        {content}
      </DialogContent>
      {!noButton && (
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            fullWidth={btnFullWidth}
            style={{
              width: !btnFullWidth ? '200px' : 'auto',
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth={btnFullWidth}
            style={{
              width: !btnFullWidth ? '200px' : 'auto',
            }}
            onClick={(event) => {
              event.preventDefault()
              onAccept()
            }}
            className={clx({
              [classes.bottonProgress]: loading,
            })}
            endIcon={loading && (
              <CircularProgress
                color="primary"
                size={15}
                disableShrink
                style={{ color: '#FFFFFF' }}
              />
            )}
          >
            {primaryActionLabel}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default CustomDialog
