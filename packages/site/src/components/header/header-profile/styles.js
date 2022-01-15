export default (theme) => ({
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
  },
  avatar: {
    borderRadius: '30px',
    marginRight: '0.4rem',
  },
  accountContainer: {
    marginRight: '1rem',
  },
  accountUsername: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  accountBalance: {
    fontSize: '14px',
    marginLeft: '5px',
  },
  accountBalanceContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    maxWidth: '200px',
    borderRadius: '10px',
    width: '100%',
  },
  iconMenuContainer: {
    backgroundColor: '#708EAC',
    width: '30px',
    height: '30px',
  },
  iconMenu: {
    width: '15px',
    height: '15px',
  },
  iconText: {
    marginLeft: '1rem',
    fontWeight: 700,
  },
  headerTicker: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.4rem',
    borderRadius: '10px',
    borderWidth: '2px',
    margin: '0 0.5rem',
    '&:hover': {
      borderWidth: '2px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '1rem 0',
      justifyContent: 'flex-start',
    },
    accountBalance: {
      fontSize: '14px',
      marginLeft: '5px',
    },
    accountBalanceContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  },
})
