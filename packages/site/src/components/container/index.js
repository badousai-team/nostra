import React from 'react'
import { styled } from '@mui/material/styles'
import MuiContainer from '@mui/material/Container'

const ContentContainer = styled(MuiContainer)(({ theme }) => ({
  flex: 1,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: '0 2rem',
  [theme.breakpoints.down('sm')]: {
    padding: '0',
  },
}))

const Container = ({ children, className }) => {
  return (
    <ContentContainer
      className={className}
      disableGutters
      maxWidth="lg"
    >
      {children}
    </ContentContainer>
  )
}

export default Container
