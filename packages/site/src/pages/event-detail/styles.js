export default function styles(theme) {
  const { color } = theme
  return {
    eventDetailNavInfo: {
      margin: '2rem 0',
    },
    eventStatus({ bgColor, textColor }) {
      return {
        padding: '0.5rem 1rem',
        fontSize: '0.75rem',
        backgroundColor: color[bgColor],
        color: color[textColor],
        borderRadius: '20px',
      }
    },
    backBtn: {
      borderRadius: '20px',
      fontSize: '1rem',
    },
    potSizeAndClosesInDiv: {
      padding: '2rem',
      borderRadius: '20px',
      backgroundColor: color.white,
    },
    label: {
      fontSize: '0.875rem',
    },
    cardDiv({ status }) {
      let borderColor = ''
      if (status === 'win') {
        borderColor = 'green'
      } else if (status === 'lose') {
        borderColor = 'red'
      } else {
        borderColor = 'black'
      }

      return {
        padding: '1.25rem',
        borderRadius: '10px',
        backgroundColor: color.white,
        border: `1px solid ${color[borderColor]}`,
      }
    },
    cardInfoLabel: {
      color: color.specialGrey,
      fontSize: '0.825rem',
    },
    winnerAddress: {
      fontSize: '0.825rem',
    },
    timeOwned: {
      fontSize: '0.825rem',
      fontWeight: 'bold',
    },
    winningOdds: {
      fontWeight: 800,
      fontSize: '1.25rem',
    },
    boxRankOrOwnership: {
      padding: '0.25rem',
      fontSize: '0.5rem',
      fontWeight: 'bold',
      backgroundColor: color.darkGrey,
      display: 'flex',
      alignItems: 'center',
    },
    nftImg: {
      borderRadius: '10px',
      border: `1px solid ${color.darkGrey}`,
    },
    nftDiv: {
      marginBottom: '1.25rem',
      position: 'relative',
    },
    titleAndPrice: {
      marginBottom: '1.125rem',
    },
    creatorDiv: {
      fontSize: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      padding: '0.375rem 1rem',
      backgroundColor: color.white,
      position: 'absolute',
      top: 0,
      right: 0,
      borderRadius: '0 10px 0 10px',
      border: `1px solid ${color.darkGrey}`,
    },
    creator: {
      color: color.electricBlue,
    },
  }
}
