import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { Icon, Typography } from '@mui/material'
import { GridOverlay, DataGrid } from '@mui/x-data-grid'
import clsx from 'clsx'

import LinearProgress from '@mui/material/LinearProgress'

import styles from './styles'

const useStyles = makeStyles(styles)

function CustomNoRowsOverlay() {
  const classes = useStyles()

  return (
    <GridOverlay>
      <Icon color="secondary" fontSize="large">
        manage_search
      </Icon>
      <Typography
        variant="subtitle2"
        color="secondary"
        className={classes.label}
      >
        No Rows
      </Typography>
    </GridOverlay>
  )
}

function CustomLoadingOverlay() {
  const classes = useStyles()
  return (
    <GridOverlay>
      <div className={classes.linearProgress}>
        <LinearProgress />
      </div>
    </GridOverlay>
  )
}

const CustomDataGrid = ({
  rows,
  columns,
  handleRowClick,
  handlePageChange,
  rowCount,
  pageSize,
  page,
  handlePageSizeChange,
  loading,
  onSortModelChange,
  overrideLayout,
  ...restProps
}) => {
  const classes = useStyles()

  return (
    <div
      className={clsx(classes.layout, overrideLayout)}
    >
      <div className={classes.flex}>
        <div className={classes.wrapper}>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick}
            onPageChange={handlePageChange}
            rowCount={rowCount}
            pageSize={pageSize}
            page={page}
            onPageSizeChange={handlePageSizeChange}
            loading={loading}
            onSortModelChange={onSortModelChange}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            className={classes.root}
            density="compact"
            // need to include 10 (the initial value of driverStore.rowsPerPage)
            rowsPerPageOptions={[10, 50, 100]}
            paginationMode="server"
            sortingMode="server"
            disableColumnFilter
            {...restProps}
          />
        </div>
      </div>
    </div>
  )
}

CustomDataGrid.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  handleRowClick: PropTypes.func,
  handlePageChange: PropTypes.func,
  rowCount: PropTypes.number,
  pageSize: PropTypes.number,
  page: PropTypes.number,
  handlePageSizeChange: PropTypes.func,
  loading: PropTypes.bool,
  onSortModelChange: PropTypes.func,
}

CustomDataGrid.defaultProps = {
  rows: [],
  columns: [],
  handleRowClick: () => null,
  handlePageChange: () => null,
  rowCount: null,
  pageSize: null,
  page: 1,
  handlePageSizeChange: () => null,
  loading: false,
  onSortModelChange: () => null,
}

export default CustomDataGrid
