export default function styles({ breakpoints, color }) {
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
    title: {
      margin: '2rem 0 1rem',
    },
    mainContainer: {
      background: color.secondary,
      border: `1px solid ${color.specialGrey}`,
      borderRadius: '30px',
      padding: '1rem 2rem',
      marginBottom: '1rem',
    },
    required: {
      color: color.red,
    },
    uploadContainer: {
      border: `1px solid ${color.specialGrey}`,
      borderRadius: '30px',
      width: '100%',
      height: '142px',
      marginBottom: '1rem',
    },
    uploadText: {
      fontSize: '20px',
    },
    maximumText: {
      color: color.orange,
    },
    detailCardContainer: {
      border: `1px solid ${color.specialGrey}`,
      borderRadius: '30px',
      padding: '1.5rem',
      marginTop: '0.5rem',
      marginBottom: '1rem',
    },
    noteTextField: {
      height: '100px',
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    createBtn: {
      margin: '2rem 0',
      borderRadius: '30px',
      padding: '1rem 2rem',
      backgroundColor: color.primary,
      color: color.secondary,
    },
  }
}
