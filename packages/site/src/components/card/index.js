import React from 'react'
import { observer } from 'mobx-react'
import {
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const NFTImage = styled('img')(() => ({
  width: '120px',
  height: '120px',
  borderRadius: 10,
}))

const Section = ({ info }) => {
  const classes = useStyles()

  return (
    <Stack
      direction="row"
      className={classes.sectionContainer}
    >
      {info.map(item => (
        <div key={item.label}>
          <Typography variant="h2">
            {item.digit}
            <Typography
              className={classes.label}
            >
              {item.label}
            </Typography>
          </Typography>
        </div>
      ))}
    </Stack>
  )
}

const CustomCard = ({ data }) => {
  let color = ''
  if (data.status === 'open') {
    color = 'green'
  } else if (data.status === 'ended') {
    color = 'gray'
  } else {
    color = 'yellow'
  }

  const classes = useStyles({ color })

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={data.id}
    >
      <Card
        className={classes.cardContainer}
      >
        <div
          className={classes.status}
        >
          <Typography
            align="right"
            variant="h3"
            className={classes.statusText}
          >
            {data.status}
          </Typography>
        </div>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          className={classes.imageContainer}
        >
          <NFTImage
            alt="first NFT"
            src={data.firstNFT}
          />
          <NFTImage
            alt="second NFT"
            src={data.secondNFT}
          />
        </Stack>
        <Divider
          className={classes.divider}
          variant="middle"
        />
        <div className={classes.infoContainer}>
          <Typography
            variant="h3"
            className={classes.eventTitle}
          >
            {data.title}
          </Typography>
          <Stack
            direction="row"
          >
            <Typography
              className={classes.sectionTitle}
            >
              Pot size
            </Typography>
            <Typography
              className={classes.sectionTitle}
            >
              Closes in
            </Typography>
          </Stack>
          <Stack
            direction="row"
          >
            <Section
              info={[{
                digit: data.total,
                label: 'USDC',
              }]}
            />
            <Section
              info={[
                {
                  digit: data.day,
                  label: 'd',
                }, {
                  digit: data.minute,
                  label: 'h',
                }, {
                  digit: data.minute,
                  label: 'm',
                },
              ]}
            />
          </Stack>
        </div>
      </Card>
    </Grid>
  )
}

export default observer(CustomCard)
