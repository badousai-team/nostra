export default (theme) => ({
  appBar: {
    backgroundColor: theme.color.white,
    '@media print': {
      display: 'none',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
  },
  avatar: {
    borderRadius: '16px',
    marginRight: '0.4rem',
  },
  accountContainer: {
    marginRight: '1rem',
    textAlign: 'end',
  },
  accountUsername: {
    fontSize: '1.2rem',
    lineHeight: '1',
    fontWeight: 'bold',
    color: theme.color.downriver,
  },
  accountBalance: {
    fontSize: '14px',
    marginLeft: '5px',
  },
  accountBalanceContainer: {
    display: 'flex',
    alignItems: 'center',
  },
})
