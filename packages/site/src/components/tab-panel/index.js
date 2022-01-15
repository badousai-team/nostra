import React from 'react'
import {
  Box,
  Typography,
} from '@mui/material'

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          {children}
        </Box>
      )}
    </Typography>
  )
}
export default TabPanel
