import React from 'react'
import NumberFormat from 'react-number-format'

const NumberField = (props) => {
  const {
    inputRef, onChange, prefix, ...other
  } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        })
      }}
      thousandSeparator="."
      decimalSeparator=","
      prefix={prefix}
    />
  )
}

export default NumberField
