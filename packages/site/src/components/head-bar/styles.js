export default (theme) => ({
  titleSection: {
    color: theme.color.primary,
    padding: '1rem',
    listStyle: 'none',
  },
  infoItem: {
    display: 'table-row',
  },
  label: {
    fontWeight: 600,
    display: 'table-cell',
    paddingRight: '1rem',
    lineHeight: 'inherit',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  textRed: {
    color: theme.color.redBerry,
  },
  textGreen: {
    color: theme.color.camarone,
  },
})
