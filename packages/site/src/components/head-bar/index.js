import React from 'react'
import clsx from 'clsx'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const HeadBar = ({ data }) => {
  const classes = useStyles()

  return (
    <div className={classes.titleSection}>
      {data && data.map((info) => {
        if (!info.value) return null
        return (
          <div className={classes.infoItem} key={info.label}>
            <Typography variant="h4" className={classes.label}>
              {info.label}
            </Typography>
            <Typography
              variant="h4"
              className={clsx(info.capitalize, {
                [classes.capitalize]: info.capitalize,
                [classes.textRed]: info.textRed,
                [classes.textGreen]: info.textGreen,
              })}
            >
              {info.value}
            </Typography>
          </div>
        )
      })}
    </div>
  )
}

export default HeadBar
