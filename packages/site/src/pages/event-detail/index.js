import React from 'react'

// Material UI
import makeStyles from '@mui/styles/makeStyles'
import {
  Button,
  Typography,
  Stack,
} from '@mui/material/'

// common component
import Page from 'site/components/page'
import Container from 'site/components/container'
import NftCard from 'site/components/nft-card'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import styles from './styles'

const useStyles = makeStyles(styles)

const EventStatus = ({ status }) => {
  let textColor = ''
  let bgColor = ''
  if (status === 'open') {
    bgColor = 'green'
    textColor = 'white'
  } else if (status === 'ended') {
    bgColor = 'gray'
    textColor = 'black'
  } else {
    bgColor = 'yellow'
    textColor = 'white'
  }

  const classes = useStyles({ bgColor, textColor })

  return (
    <div className={classes.eventStatus}>
      {status}
    </div>
  )
}

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
              {item.label || ''}
            </Typography>
          </Typography>
        </div>
      ))}
    </Stack>
  )
}

const EventDetail = () => {
  const classes = useStyles()

  return (
    <Page>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={classes.eventDetailNavInfo}
        >
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            className={classes.btnBackAndStatusDiv}
          >
            <Button
              variant="contained"
              className={classes.backBtn}
            >
              <ArrowBackIcon
                style={{
                  fontSize: '1rem',
                  marginRight: '0.25rem',
                }}
              />
              Back
            </Button>
            <EventStatus status="open" />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            className={classes.potSizeAndClosesInDiv}
          >
            <Stack direction="column">
              <Typography
                variant="body2"
              >
                Pot Size
              </Typography>
              <Section
                info={[{
                  digit: 1000,
                  label: 'ONE',
                }]}
              />
            </Stack>
            <Stack direction="column">
              <Typography
                variant="body2"
              >
                Closes in
              </Typography>
              <Section
                info={[
                  {
                    digit: 9,
                    label: 'd',
                  }, {
                    digit: 30,
                    label: 'h',
                  }, {
                    digit: 20,
                    label: 'm',
                  },
                ]}
              />
            </Stack>
          </Stack>
        </Stack>
        <div
          style={{
            marginBottom: '2rem',
          }}
        >
          <Typography variant="h2">
            Event Title
          </Typography>
        </div>
        <Stack
          direction="row"
          spacing={3}
          style={{
            marginBottom: '3rem',
          }}
        >
          {[1, 2].map((index) => (
            <NftCard key={index} />
          ))}
        </Stack>
      </Container>
    </Page>
  )
}

export default EventDetail
