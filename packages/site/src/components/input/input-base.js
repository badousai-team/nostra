import React from 'react'
import { makeStyles } from '@mui/styles'
import FormHelperText from '@mui/material/FormHelperText'

import { Input } from '@mui/material'
import styles from './styles'

const useStyles = makeStyles(styles)

const CustomInputBase = ({
  label,
  helperText,
  ...props
}) => {
  const classes = useStyles()

  return (
    <>
      <Input
        fullWidth
        disableUnderline
        className={classes.inputBase}
        classes={{
          label: classes.label,
          root: classes.input,
          focused: classes.focused,
          error: classes.error,
        }}
        {...props}
      />
      <FormHelperText error={props.error}>
        {helperText}
      </FormHelperText>
    </>
  )
}

export default CustomInputBase
