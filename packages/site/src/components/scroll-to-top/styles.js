export default function styles(theme) {
  const {
    color,
    breakpoints,
  } = theme

  return {
    btnUpContent: {
      zIndex: 3,
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'fixed',
      bottom: theme.spacing(6),
      right: theme.spacing(6),
      [breakpoints.down('md')]: {
        right: theme.spacing(4),
      },
      [breakpoints.down('sm')]: {
        right: theme.spacing(2),
      },
    },
    floatBtn: {
      borderRadius: '50%',
      padding: '1.5rem',
      [breakpoints.down('md')]: {
        padding: '1.25rem',
      },
    },
    iconFloatBtn: {
      color: color.electricBlue,
      [breakpoints.down('md')]: {
        fontSize: '1.25rem',
      },
    },
  }
}
