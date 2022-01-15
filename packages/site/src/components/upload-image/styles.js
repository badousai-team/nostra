import { alpha } from '@mui/material/styles'

export default (theme) => ({
  attach: {
    color: theme.color.black,
    fontSize: '1rem',
    border: `1px dashed ${alpha('#1B295E', 0.35)}`,
    width: '100%',
    minHeight: '6rem',
    display: 'flex',
    background: '#FAFAFA',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '0',
    padding: '2rem 1rem',
    cursor: 'pointer',
  },
  errorText: {
    color: 'red',
    paddingTop: '0.5rem',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  selectedImgContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginTop: '1rem',
    width: '100%',
  },
  selectedImg: {
    maxWidth: '160px',
    maxHeight: '160px',
  },
  buttonUpload: {
    display: 'block',
    margin: '1rem auto',
  },
  removeButton: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  iconRemove: {
    fontSize: '2rem',
  },
  message: {
    fontWeight: 'bold',
    color: theme.color.primary,
  },
})
