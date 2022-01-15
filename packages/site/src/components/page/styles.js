export default (theme) => ({
  page: ({ lockScroll }) => {
    const { breakpoints } = theme
    return {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: lockScroll ? 'hidden' : 'auto',
      marginTop: '72px',
      [breakpoints.down('sm')]: {
        padding: '0 1rem',
      },
    }
  },
})
