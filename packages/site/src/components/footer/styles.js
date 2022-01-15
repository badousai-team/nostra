export default (theme) => ({
  wrapper: {
    backgroundColor: theme.color.white,
  },
  containerWrapper: {
    height: 72,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      height: 'unset',
      padding: '0.5rem 0',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  link: {
    margin: '0 1rem',
    fontSize: '1rem',
  },
  footerLink: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& $divider': {
        display: 'none',
      },
    },
  },
  divider: {},
})
