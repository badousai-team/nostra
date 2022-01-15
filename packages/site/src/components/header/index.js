import React, { useState } from 'react'
import { observer } from 'mobx-react'
import {
  Avatar,
  Typography,
  Container,
  AppBar,
  IconButton,
  useMediaQuery,
  Stack,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { useStores } from 'site/hooks'
import Link from 'site/components/link'

import DrawerNav from './drawer'
import HeaderProfile from './header-profile'

const HeaderBar = styled(AppBar)(({
  backgroundColor: '#fff',
}))

const HeaderContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1rem',
  height: '72px',
  [theme.breakpoints.down('sm')]: {
    height: 'unset',
    padding: '0 0.5rem',
  },
}))

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

const HeaderRight = styled('div')(({ theme }) => ({
  margin: '0',
  [theme.breakpoints.down('sm')]: {
    flex: '1',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    display: 'flex',
  },
}))

const ProfilePhoto = observer(() => {
  const { accountStore } = useStores()

  return (
    <Avatar
      src={accountStore.user?.profileUrl || '/images/png/user-login.png'}
      alt={accountStore.user?.username}
      sx={{ width: '32px', height: '32px' }}
    />
  )
})

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { accountStore } = useStores()

  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const handleDrawerToggle = () => {
    setIsDrawerOpen((isOpen) => !isOpen)
  }

  return (
    <>
      <HeaderBar
        position="fixed"
        elevation={0}
      >
        <HeaderContainer disableGutters maxWidth="lg">
          <LogoLink href="/" underline="none">
            <LogoImg
              alt="Nostra"
              title="Nostra"
              src="/images/png/harmony.png"
            />
            <LogoText variant="h3">
              Nostra
            </LogoText>
          </LogoLink>
          <HeaderRight>
            {isMobile && accountStore.user ? (
              <Stack direction="row">
                {/* <div style={{ margin: '0 0.4rem' }}>
                  <AddProjectButton size="small" />
                </div> */}
                <IconButton
                  onClick={handleDrawerToggle}
                  size="large"
                  edge="start"
                  color="primary"
                  aria-label="menu"
                >
                  <ProfilePhoto />
                </IconButton>
              </Stack>
            ) : <HeaderProfile />}
          </HeaderRight>
        </HeaderContainer>
      </HeaderBar>
      <DrawerNav
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
      />
    </>
  )
}

export default observer(Header)
