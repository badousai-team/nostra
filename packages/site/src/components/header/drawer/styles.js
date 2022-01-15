export default (theme) => ({
  drawerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem',
    height: '72px',
    [theme.breakpoints.down('sm')]: {
      height: 'unset',
      padding: '0 0.5rem',
    },
  },
  bodyNav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
})
