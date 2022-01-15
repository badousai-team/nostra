export default (theme) => ({
  // https://material-ui.com/components/data-grid/rendering/#customization-example
  root: {
    border: 0,
    fontSize: '0.8rem',
    color: theme.color.white,
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${theme.color.gray}`,
    },
    '& .MuiDataGrid-cell': {
      color: theme.palette.text.secondary,
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal',
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiDataGrid-colCellTitle': {
      fontWeight: 600,
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    '& .MuiDataGrid-row': {
      backgroundColor: theme.color.white,
      fontWeight: 600,
      '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
      },
      maxHeight: 'none !important',
    },
    '& .MuiDataGrid-viewport': {
      borderRight: `0.5px solid ${theme.color.gray}`,
      borderLeft: `0.5px solid ${theme.color.gray}`,
      maxHeight: 'none !important',
    },
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
    },
    '& .Mui-selected': {
      backgroundColor: `${theme.color.wheat} !important`,
    },
  },
  wrapper: {
    flexGrow: 1,
    '& .hideColumnLabel': {
      visibility: 'hidden',
    },
  },
  layout: {
    height: '100vh',
    width: '100%',
  },
  flex: {
    display: 'flex',
    height: '100%',
  },
  label: {
    marginLeft: theme.spacing(1),
  },
  linearProgress: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
})
