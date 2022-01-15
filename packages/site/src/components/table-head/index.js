import React from 'react'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import {
  TableCell,
  TableRow,
  TableHead,
} from '@mui/material'

import styles from './styles'

const useStyles = makeStyles(styles)

const SimpleTableHead = (props) => {
  const classes = useStyles()
  return (
    <TableHead>
      <TableRow>
        {props.cell.map((head) => (
          <TableCell
            key={head}
            classes={{
              head: clsx(
                classes.head,
                props.overrideHead,
              ),
            }}
          >
            {head}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default SimpleTableHead
