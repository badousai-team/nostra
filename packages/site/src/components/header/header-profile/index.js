import React, { useState, lazy, Suspense } from 'react'
import { observer } from 'mobx-react'
import {
  Typography,
  CircularProgress,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  ButtonBase,
  Button,
  useMediaQuery,
} from '@mui/material'

import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { makeStyles } from '@mui/styles'

import Link from 'site/components/link'
import { DISABLE_LOGIN } from 'site/config'
import { useStores } from 'site/hooks'

import Account from '../account'
// import AddProjectButton from './add-project-button'

import styles from './styles'

const BtnMetamaskConnect = lazy(() => import('site/components/button/metamask-connect'))

const useStyle = makeStyles(styles)

const HeaderProfile = ({ onCloseDrawer }) => {
  const { accountStore } = useStores()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const classes = useStyle()
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleProfileClick = () => {
    accountStore.openProfileDialog = true
    handleClose()
  }
  const handleLogout = () => {
    accountStore.logout()
    if (onCloseDrawer) onCloseDrawer()
    handleClose()
  }

  if (DISABLE_LOGIN) return null

  if (accountStore.loading) {
    return <CircularProgress color="secondary" />
  }

  if (accountStore.user && !isMobile) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
          {!isMobile && <Account />}
          <ButtonBase
            variant="contained"
            color="primary"
            id="account-profile-button"
            aria-controls="account-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <div className={classes.avatarContainer}>
              <Avatar
                src={accountStore.user?.profileUrl || '/images/png/user-login.png'}
                alt={accountStore.user?.username}
                className={classes.avatar}
              />
              <KeyboardArrowDownIcon size="small" />
            </div>
          </ButtonBase>
        </div>
        {!isMobile ? (
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            classes={{
              paper: classes.paper,
            }}
            MenuListProps={{
              'aria-labelledby': 'account-profile-button',
            }}
          >
            <div style={{ textAlign: 'center', padding: '0 1rem', fontWeight: 'bold' }}>
              {accountStore.accountShortDisplay}
            </div>
            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                <Avatar className={classes.iconMenuContainer}>
                  <AccountBoxIcon fontSize="small" className={classes.iconMenu} />
                </Avatar>
              </ListItemIcon>
              <ListItemText className={classes.iconText}>
                Profile
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Avatar className={classes.iconMenuContainer}>
                  <ExitToAppIcon fontSize="small" className={classes.iconMenu} />
                </Avatar>
              </ListItemIcon>
              <ListItemText className={classes.iconText}>
                Logout
              </ListItemText>
            </MenuItem>
          </Menu>
        ) : null}
      </>
    )
  }

  if (accountStore.user && isMobile) {
    return (
      <div style={{ width: '100%' }}>
        <MenuList>
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <Avatar className={classes.iconMenuContainer}>
                <AccountBoxIcon fontSize="small" className={classes.iconMenu} />
              </Avatar>
            </ListItemIcon>
            <ListItemText className={classes.iconText}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: 'bold' }}>
                  {accountStore.user.username}
                </Typography>
                <Typography style={{ fontWeight: 'bold' }}>
                  {accountStore.accountShortDisplay}
                </Typography>
              </div>
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Avatar className={classes.iconMenuContainer}>
                <ExitToAppIcon fontSize="small" className={classes.iconMenu} />
              </Avatar>
            </ListItemIcon>
            <ListItemText className={classes.iconText}>
              Logout
            </ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    )
  }

  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <div style={{ display: 'flex' }}>
        <BtnMetamaskConnect />
      </div>
    </Suspense>
  )
}

export default observer(HeaderProfile)
