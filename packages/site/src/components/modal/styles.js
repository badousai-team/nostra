export default function styles(theme) {
  const { color, breakpoints } = theme
  return {
    modalDiv: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0.875rem 1.25rem',
    },
    modalHeaderDiv: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    caption: {
      marginTop: '1rem',
      fontSize: '1.25rem',
    },
    desc1Div: {
      marginTop: '0.5rem',
      maxWidth: '250px',
    },
    desc1: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    desc2Div: {
      marginTop: '2rem',
      maxWidth: '260px',
    },
    desc2: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    btnText: {
      flex: 1,
      marginLeft: '1rem',
      fontWeight: 600,
    },
    circularLoading: {
      marginLeft: '0.5rem',
    },
    deleteDialog: {
      color: color.red,
      lineHeight: '22px',
    },
    avatar: {
      borderRadius: '16px',
    },
    accountBalanceContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '1rem',
    },
    accountBalance: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      marginLeft: '0.8rem',
    },
    profile: {
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    content: {
      margin: 0,
      padding: 0,
    },
    container: {
      height: '700px',
      maxWidth: '1000px',
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
    },
    imageWrapper: {
      overflow: 'auto',
    },
    profileContainer: {
      height: '100%',
      padding: '2rem',
      flex: '45%',
      borderRight: `1px solid ${color.specialGrey}`,
      [theme.breakpoints.down('sm')]: {
        borderRight: 'unset',
      },
    },
    noNft: {
      background: '#F2F8F9',
      padding: '2rem',
      borderRadius: '10px',
      textAlign: 'center',
      height: 0,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    account: {
      padding: '1rem 0',
      textAlign: 'center',
      fontSize: '1.125rem',
      fontWeight: '600',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '300px',
      },
    },
    profileAndUsername: {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '1rem',
      marginRight: '5rem',
      [breakpoints.down('sm')]: {
        marginRight: '2rem',
      },
    },
    rewardAmount: {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.5rem',
    },
    username: {
      fontSize: '1rem',
      fontWeight: 600,
      color: color.black,
      [breakpoints.down('sm')]: {
        fontSize: '0.75rem',
      },
    },
    amount: {
      color: color.electricBlue,
      fontSize: '1rem',
      [breakpoints.down('sm')]: {
        fontSize: '0.75rem',
      },
    },
    usernameDiv: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    },
    currentUser: {
      fontSize: '0.825rem',
      color: color.specialGrey,
      [breakpoints.down('sm')]: {
        fontSize: '0.5rem',
      },
    },
    profileImg: {
      width: '56px',
      height: '56px',
      borderRadius: '20px',
      [breakpoints.down('sm')]: {
        width: '40px',
        height: '40px',
        borderRadius: '20px',
      },
    },
    rewardContainer: {
      minWidth: '320px',
      [breakpoints.down('sm')]: {
        minWidth: '280px',
      },
    },
    rowDiv: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: '0.25rem',
    },
    boldText: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    totalReward: {
      display: 'inline-flex',
      flexDirection: 'row',
      gap: '0.375rem',
      alignItems: 'center',
    },
    divider: {
      marginTop: '0.5rem',
      paddingTop: '1rem',
      borderTop: `1px solid ${color.primary}`,
    },
    shareText: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    rewardDialog: {
      borderRadius: '10px',
      [breakpoints.down('sm')]: {
        margin: 'auto',
      },
    },
    rewardTitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rewardCircular: {
      color: color.white,
    },
    tipAmountAndBalance: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    balance: {
      fontSize: '1rem',
      fontWeight: 700,
      color: color.primary,
    },
    tipDistributions: {
      padding: '0.75rem',
      backgroundColor: color.whiteBlue,
      borderRadius: '10px',
    },
    tipDistributionsText: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    profileGrid: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%',
      borderTop: `1px solid ${color.specialGrey}`,
      borderBottom: `1px solid ${color.specialGrey}`,
    },
    textfield: {
      marginTop: '2rem',
    },
    nftContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flex: '55%',
      padding: '2rem',
    },
    selectImgText: {
      display: 'block',
      marginBottom: '1rem',
      fontSize: '0.825rem',
    },
    twitterConnect: {
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.lightBlue,
      padding: '1rem',
      borderRadius: '10px',
      gap: '0.5rem',
    },
    twitterIcon: {
      width: '40px',
      color: color.primary,
    },
    twitterConnectText: {
      fontSize: '0.75rem',
      lineHeight: '16px',
    },
    twitterConnectBtn: {
      fontSize: '0.825rem',
      borderRadius: '10px',
    },
    backContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
  }
}
