import React, {
  useState,
  useCallback,
} from 'react'

import {
  Autocomplete,
  CircularProgress,
  TextField as MuiTextField,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

export default function CustomizedAutocomplete({
  handleOpen = () => null,
  handleInputChange,
  handleChange,
  options,
  loading,
  classesAutocomplete,
  multiple = false,
  label,
  renderOption = null,
  size,
  errorMessage = null,
  helperTextTextField = null,
  inputRefTextField = null,
  ...props
}) {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const onOpen = useCallback(() => {
    setOpen(true)
    handleOpen()
  }, [handleOpen])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  const getOptionSelected = useCallback((option, value) => {
    return option.key === value.key
  }, [])

  const getOptionLabel = useCallback((option) => {
    return option.label
  }, [])

  return (
    <Autocomplete
      sx={{ maxWidth: 500, width: '100%' }}
      open={open}
      multiple={multiple}
      onOpen={onOpen}
      onClose={onClose}
      classes={{
        option: classes.option,
      }}
      onInputChange={handleInputChange}
      onChange={handleChange}
      isOptionEqualToValue={getOptionSelected}
      getOptionLabel={getOptionLabel}
      options={options}
      loading={loading}
      renderOption={renderOption}
      size={size}
      {...props}
      renderInput={(params) => (
        <MuiTextField
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          error={errorMessage}
          helperText={helperTextTextField}
          inputRef={inputRefTextField}
          {...props}
          {...params}
        />
      )}
      {...props}
    />
  );
}
