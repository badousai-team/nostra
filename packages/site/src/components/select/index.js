import React from 'react'
import { makeStyles } from '@mui/styles'

import {
  Select,
} from '@mui/material'

import styles from './styles'

import CustomInputBase from '../input/input-base'

const useStyles = makeStyles(styles)

const CustomInput = ({
  label,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Select
      labelId="demo-customized-select-label"
      id="demo-customized-select"
      classes={{
        root: classes.inputSelect,
      }}
      style={{ display: 'flex' }}
      input={<CustomInputBase />}
      MenuProps={{ classes: { paper: classes.dropdownStyle } }}
      {...props}
    />

  )
}

export default CustomInput
