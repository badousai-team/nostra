import React from 'react'
import Drawer from '@mui/material/Drawer'
import { makeStyles } from '@mui/styles'
import Link from 'site/components/link'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import {
  Typography,
  IconButton,
} from '@mui/material'

import styles from './styles'
import HeaderProfile from '../header-profile'
const useStyle = makeStyles(styles)

const LogoLink = styled(Link)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  color: theme.color.textPrimary,
}))

const LogoImg = styled('img')(({ theme }) => ({
  width: '56px',
  height: '56px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '-0.5rem',
  },
}))

const LogoText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    maxWidth: '120px',
    marginLeft: '-0.5rem',
  },
}))

const DrawerNav = ({ open, onClose }) => {
  const classes = useStyle()

  return (
    <div>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="top"
        open={open}
        onClose={onClose}
      >
        <div className={classes.drawerHeader}>
          <LogoLink to="/" underline="none">
            <LogoImg
              alt="Nostra"
              title="Nostra"
              src="/images/png/harmony.png"
            />
            <LogoText variant="h3">
              Nostra
            </LogoText>
          </LogoLink>
          <div>
            <IconButton
              onClick={onClose}
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className={classes.bodyNav}>
          <HeaderProfile onCloseDrawer={onClose} />
        </div>
      </Drawer>
    </div>
  )
}

export default DrawerNav
