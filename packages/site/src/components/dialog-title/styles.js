export default (theme) => ({
  root: {
    position: 'relative',
    margin: 0,
    padding: '1rem 1.5rem',
    fontSize: '1.2rem',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.color.shadow,
  },
  resetButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
})
