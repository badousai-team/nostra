export default (theme) => ({
  tabsIndicator: {
    display: 'none',
  },
  tab: {
    textTransform: 'none',
    border: `0.5px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    background: theme.color.white,
    fontWeight: 600,
  },
  tabSelected: {
    borderBottomWidth: 0,
    background: theme.palette.secondary.main,
    color: `${theme.color.white} !important`,
  },
})
