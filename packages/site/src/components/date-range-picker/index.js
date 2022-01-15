import React from 'react'
import { toJS } from 'mobx'
import { makeStyles } from '@mui/styles'
import { DateRangePicker } from 'react-date-range'
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  useTheme,
} from '@mui/material'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import styles from './styles'

const useStyles = makeStyles(styles)

const DateRange = ({ anchorEl, handleClose, handleSelect, selectionRange }) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Popper
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      className={classes.popper}
      onClick={event => event.stopPropagation()}
      onSelect={event => event.stopPropagation()}
      style={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      }}
      transition
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <DateRangePicker
                ranges={[toJS(selectionRange)]}
                onChange={handleSelect}
                color={theme.color.primary}
                rangeColors={[theme.color.primary]}
              />
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}

export default DateRange
