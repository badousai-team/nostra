import React from 'react'
import { observer } from 'mobx-react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

import styles from './styles'

const useStyles = makeStyles(styles)

const BasicTable = ({
  list,
  cellName,
}) => {
  const classes = useStyles()

  return (
    <TableContainer classes={{
      root: classes.container,
    }}
    >
      {list.length ? (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellName.map((name) => {
                return (
                  <TableCell
                    key={name}
                    className={classes.cellHeader}
                  >
                    {name}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.text}
        >
          <Typography>
            No Rows
          </Typography>
        </Stack>
      )}
    </TableContainer>
  )
}

export default observer(BasicTable)
