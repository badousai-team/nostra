export default (theme) => ({
  wrapper: {
    backgroundColor: theme.color.primary,
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
  img: {
    width: '176px',
    height: '43px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-0.5rem',
    },
  },
  link: {
    margin: '0 1rem',
    fontSize: '1rem',
    color: theme.color.secondary,
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
  divider: {
    backgroundColor: theme.color.secondary,
  },
})
