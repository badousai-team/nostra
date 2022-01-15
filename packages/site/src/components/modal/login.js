import React from 'react'
import { observer } from 'mobx-react'
import { makeStyles } from '@mui/styles'
import {
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material'

import CustomizedDialog from 'site/components/dialog'

import { useStores } from 'site/hooks'

import styles from './styles'

const useStyles = makeStyles(styles)

const ModalLogin = () => {
  const classes = useStyles()
  const { accountStore } = useStores()
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <CustomizedDialog
      maxWidth="sm"
      fullScreen={isMobile}
      open={accountStore.openLoginDialog}
      noButton
      onClose={() => accountStore.setLoginDialog(false)}
      content={(
        <div className={classes.modalDiv}>
          <div className={classes.modalHeaderDiv}>
            <img
              src="/images/png/user-login.png"
              alt="User Login"
              width={48}
            />
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.caption}
            >
              Connect to a wallet
            </Typography>
          </div>
          <Button
            variant="contained"
            color="metamask"
            onClick={accountStore.login}
          >
            <img
              src="/images/png/metamask.png"
              alt="metamask"
              width={22}
            />
            <Typography className={classes.btnText}>
              Connect to MetaMask
            </Typography>
            {accountStore.processingMetamask && (
              <CircularProgress
                size={24}
                color="white"
                className={classes.circularLoading}
              />
            )}
          </Button>
          <div className={classes.desc2Div}>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              className={classes.desc2}
            >
              {accountStore.processingMetamask ? (
                'Please select Metamask wallet to use and click Sign button on your Metamask wallet. Processing...'
              ) : (
                'You will be prompted to sign one-time nonce with your Metamask wallet for better security measure.'
              )}
            </Typography>
          </div>
        </div>
      )}
    />
  )
}

export default observer(ModalLogin)
