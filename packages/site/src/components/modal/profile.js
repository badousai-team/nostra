import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { styled } from '@mui/material/styles'
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  ButtonBase,
  IconButton,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import CustomizedDialog from 'site/components/dialog'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import TwitterIcon from '@mui/icons-material/Twitter'

import { useStores } from 'site/hooks'
import styles from './styles'

const useStyle = makeStyles(styles)

const NftImg = styled('img')(({ theme, selected }) => ({
  cursor: 'pointer',
  maxWidth: '100%',
  outline: selected ? `4px solid ${theme.color.primary}` : undefined,
}))

const NftList = observer(({
  nftList,
  profileUrl,
  setProfileUrl,
  setShowNftList,
}) => {
  const classes = useStyle()
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <div className={classes.nftContainer}>
      {
        isMobile && (
          <div
            className={classes.backContainer}
          >
            <IconButton
              color="primary"
              onClick={() => {
                setShowNftList(false)
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              Profile Image
            </Typography>
          </div>
        )
      }
      <Typography className={classes.selectImgText}>
        Select your profile image from your available NFT collections
      </Typography>
      <Grid
        container
        spacing={1}
        className={classes.imageWrapper}
      >
        {(nftList.length > 0) ? nftList.map((nft) => {
          return (
            <Grid
              key={nft.id}
              item
              xs={3}
              sm={2}
            >
              <NftImg
                src={nft.url}
                alt={nft.name}
                title={nft.name}
                selected={nft.url === profileUrl}
                onClick={() => { setProfileUrl(nft.url) }}
              />
            </Grid>
          )
        }) : (
          <div className={classes.noNft}>
            <Typography style={{ fontSize: '0.825rem' }}>
              Looks like you don't have NFT in your wallet
            </Typography>
          </div>
        )}
      </Grid>
    </div>
  )
})

const ModalProfile = () => {
  const classes = useStyle()

  const { accountStore } = useStores()
  const [username, setUsername] = useState('')
  const [profileUrl, setProfileUrl] = useState('')
  const [nftList, setNftList] = useState([])
  const [showNftList, setShowNftList] = useState(false)
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const loadNFT = async () => {
    if (accountStore.loadingNFT) return
    const nfts = await accountStore.getUserNFTs()
    if (nfts) setNftList(nfts)
  }

  useEffect(() => {
    if (!isMobile) {
      setShowNftList(false)
    }
  }, [isMobile])

  const handleUpdateUserProfile = async (e) => {
    if (e) e.preventDefault()
    const isSuccess = await accountStore.updateUserProfile(username, profileUrl)
    if (isSuccess) accountStore.openProfileDialog = false
  }

  const init = () => {
    if (accountStore.user) {
      setUsername(accountStore.user.username)
      setProfileUrl(accountStore.user.profileUrl)
    }
    loadNFT()
  }

  useEffect(() => {
    if (!accountStore.openProfileDialog) return
    init()
  }, [accountStore.openProfileDialog])

  const renderForm = () => {
    return (
      <div className={classes.profileGrid}>
        {
          !showNftList ? (
            <div className={classes.profileContainer}>
              <div className={classes.profile}>
                <ButtonBase
                  style={{ borderRadius: '60px', overflow: 'hidden' }}
                  onClick={() => {
                    if (isMobile) {
                      setShowNftList(true)
                    }
                  }}
                >
                  <Avatar
                    src={accountStore.user?.profileUrl || '/images/png/user-login.png'}
                    alt={accountStore.user?.username}
                    className={classes.avatar}
                    sx={{ width: '56px', height: '56px' }}
                  />
                </ButtonBase>
                <Typography className={classes.account}>
                  {accountStore.accountProfileShortDisplay}
                </Typography>
              </div>
              <TextField
                fullWidth
                label="Username"
                helperText="Please enter a new unique username"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
                className={classes.textfield}
              />
              <div className={classes.twitterConnect}>
                <TwitterIcon className={classes.twitterIcon} />
                <Typography
                  variant="body2"
                  className={classes.twitterConnectText}
                >
                  Connect with your twitter to verify your account
                </Typography>
                <Button
                  variant="contained"
                  className={classes.twitterConnectBtn}
                >
                  Connect
                </Button>
              </div>
            </div>
          ) : (
            <NftList
              nftList={nftList}
              profileUrl={profileUrl}
              setProfileUrl={setProfileUrl}
              setShowNftList={setShowNftList}
            />
          )
        }
        {
          (!isMobile) && (
            <NftList
              nftList={nftList}
              profileUrl={profileUrl}
              setProfileUrl={setProfileUrl}
              setShowNftList={setShowNftList}
            />
          )
        }
      </div>
    )
  }

  return (
    <CustomizedDialog
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      open={accountStore.openProfileDialog}
      title="Account Profile"
      classesContent={classes.content}
      classesContainer={{ paper: classes.container }}
      primaryActionLabel="Save"
      onClose={() => { accountStore.openProfileDialog = false }}
      content={renderForm()}
      onAccept={handleUpdateUserProfile}
      btnFullWidth={false}
    />
  )
}

export default observer(ModalProfile)
