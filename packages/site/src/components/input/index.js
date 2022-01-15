import React from 'react'
import { makeStyles } from '@mui/styles'

import { InputLabel, FormControl } from '@mui/material'
import styles from './styles'

import CustomInputBase from './input-base'

const useStyles = makeStyles(styles)

const CustomInput = ({
  label,
  ...props
}) => {
  const classes = useStyles()

  return (
    <FormControl variant="standard" fullWidth>
      {label && (
        <InputLabel
          shrink
          error={props.error}
          className={classes.label}
        >
          {label}
        </InputLabel>
      )}
      <CustomInputBase
        {...props}
      />
    </FormControl>
  )
}

export default CustomInput
