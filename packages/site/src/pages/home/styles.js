export default function styles({ breakpoints }) {
  return {
    page: {
      [breakpoints.down('sm')]: {
        padding: 'unset',
      },
    },
    container: {
      [breakpoints.down('sm')]: {
        padding: '0 1rem !important',
      },
    },
  }
}
