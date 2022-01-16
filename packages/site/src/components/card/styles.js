export default (theme) => {
  return {
    cardContainer: ({ color }) => {
      return {
        borderRadius: 10,
        border: `1px solid ${theme.color[color]}`,
      }
    },
    status: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    statusText: ({ color }) => {
      return {
        borderBottomLeftRadius: 10,
        padding: '10px 20px',
        color: theme.color.white,
        textTransform: 'capitalize',
        marginBottom: '1.5rem',
        backgroundColor: theme.color[color],
      }
    },
    divider: {
      margin: '1.5rem 2rem',
    },
    eventTitle: {
      textAlign: 'center',
      height: '60px',
    },
    sectionContainer: {
      flex: 2,
    },
    infoContainer: {
      margin: '0 2rem 2rem',
    },
    sectionTitle: {
      flex: 2,
      fontSize: '1rem',
    },
    label: {
      fontSize: '0.875rem',
    },
  }
}
