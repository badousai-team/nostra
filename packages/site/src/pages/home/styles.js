export default function styles({ breakpoints }) {
  return {
    page: {
      [breakpoints.down('sm')]: {
        padding: 'unset',
      },
    },
    container: {
      marginBottom: '1rem',
      [breakpoints.down('sm')]: {
        padding: '0 1rem !important',
      },
    },
    title: {
      textAlign: 'center',
      margin: '1.5rem 0',
    },
  }
}
