import React from 'react'

// Material UI
import makeStyles from '@mui/styles/makeStyles'
import {
  Typography,
  Stack,
} from '@mui/material/'

// common component

import { shortenAddress } from 'site/utils/helper'

import styles from './styles'

const useStyles = makeStyles(styles)

const Section = ({ info }) => {
  const classes = useStyles()

  return (
    <Stack
      direction="row"
    >
      {info.map(item => (
        <div key={item.label}>
          <Typography variant="h2">
            {item.digit}
            <Typography
              className={classes.label}
            >
              {item.label || ''}
            </Typography>
          </Typography>
        </div>
      ))}
    </Stack>
  )
}

const NftCard = () => {
  const status = 'no'
  const classes = useStyles({ status })
  return (
    <Stack
      direction="column"
      className={classes.cardDiv}
    >
      <div className={classes.nftDiv}>
        <img
          src="/images/jpg/dummy-img.jpg"
          alt="dummy"
          width="280"
          height="280"
          className={classes.nftImg}
        />
        <div className={classes.creatorDiv}>
          Created by <span className={classes.creator}>omghgghg</span>
        </div>
      </div>
      <Stack
        direction="column"
        spacing={1}
        className={classes.titleAndPrice}
      >
        <Typography variant="h6">
          NFT 1
        </Typography>
        <Section
          info={[{
            digit: '4.4 ARB',
            label: '/hour',
          }]}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Stack
          direction="column"
          spacing={1}
        >
          <Typography className={classes.cardInfoLabel}>
            Currently owned by
          </Typography>
          <Stack
            direction="row"
            spacing={2}
          >
            <Typography className={classes.winnerAddress}>
              {shortenAddress('0xb4097aba03fa1e23af4f330db7ab30653d397fb2')}
            </Typography>
            <div className={classes.boxRankOrOwnership}>
              #1
            </div>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
          >
            <Typography className={classes.timeOwned}>
              for 1 hour of 11 hours
            </Typography>
            <div className={classes.boxRankOrOwnership}>
              20%
            </div>
          </Stack>
        </Stack>
        <Stack direction="column">
          <Typography className={classes.cardInfoLabel}>
            Winning odds ?
          </Typography>
          <Typography className={classes.winningOdds}>
            50%
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default NftCard
