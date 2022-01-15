import { alpha } from '@mui/material/styles'

export default (theme) => ({
  input: {
    borderRadius: '10px',
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `0 0 2px 0.1rem ${alpha(theme.palette.primary.main, 0.25)}`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {
    boxShadow: `0 0 2px 0.1rem ${alpha(theme.palette.primary.main, 0.25)}`,
    borderColor: theme.palette.primary.main,
  },
  error: {
    boxShadow: `0 0 3px 0.1rem ${alpha(theme.palette.error.main, 0.35)}`,
    borderColor: theme.palette.error.main,
    '& $label': {
      color: theme.palette.error.main,
    },
  },
  inputBase: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  label: {
    color: theme.color.black,
  },
  helperText: {
    color: theme.palette.error.main,
  },
})
