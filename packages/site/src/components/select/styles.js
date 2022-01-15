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
  inputBase: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  label: {
    color: theme.color.black,
  },
  dropdownStyle: {
    boxShadow: `0 0 2px 0.1rem ${alpha(theme.palette.primary.main, 0.25)}`,
    borderRadius: '10px',
    fontSize: '1rem',
  },
  inputSelect: {
    display: 'flex',
  },
})
