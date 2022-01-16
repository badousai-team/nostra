import React from 'react'
import { observer } from 'mobx-react'

import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

// Material UI
import makeStyles from '@mui/styles/makeStyles'
import DownloadIcon from '@mui/icons-material/Download'
// common component
import Page from 'site/components/page'
import Container from 'site/components/container'
import { styled } from '@mui/material/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const CustomTextField = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: '25px',
  },
  margin: '0.5rem 0 2.5rem',
  height: '30px',
}))

const RequiredText = ({ text }) => {
  const classes = useStyles()

  return (
    <Typography variant="h3">
      {text}<Typography className={classes.required}>*</Typography>
    </Typography>
  )
}

const CreateEvent = () => {
  const classes = useStyles()

  return (
    <Page className={classes.page}>
      <Container className={classes.container}>
        <Typography
          variant="h1"
          className={classes.title}
        >
          Create Event
        </Typography>
        <Stack
          className={classes.mainContainer}
        >
          <RequiredText
            text="Event Title"
          />
          <CustomTextField
            variant="outlined"
          />
          <Grid
            container
            spacing={{ xs: 0.5, sm: 1, md: 2, lg: 4 }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
            >
              <RequiredText
                text="Card 1"
              />
              <div className={classes.detailCardContainer}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  className={classes.uploadContainer}
                >
                  <Typography className={classes.uploadText}>
                    Upload artwork as JPG, PNG, GIF
                  </Typography>
                  <Typography className={classes.maximumText}>
                    Maximum size 30 MB
                  </Typography>
                  <DownloadIcon />
                </Stack>
                <RequiredText
                  text="NFT Name"
                />
                <CustomTextField
                  fullWidth
                  variant="outlined"
                />
                <RequiredText
                  text="Bid"
                />
                <CustomTextField
                  fullWidth
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
            >
              <Typography variant="h3">
                Card 2<Typography className={classes.required}>*</Typography>
              </Typography>
              <div className={classes.detailCardContainer}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  className={classes.uploadContainer}
                >
                  <Typography className={classes.uploadText}>
                    Upload artwork as JPG, PNG, GIF
                  </Typography>
                  <Typography className={classes.maximumText}>
                    Maximum size 30 MB
                  </Typography>
                  <DownloadIcon />
                </Stack>
                <RequiredText
                  text="Card 1"
                />
                <CustomTextField
                  fullWidth
                  variant="outlined"
                />
                <RequiredText
                  text="Bid"
                />
                <CustomTextField
                  fullWidth
                  variant="outlined"
                />
              </div>
            </Grid>
          </Grid>
          <RequiredText
            text="Limit Event Time"
          />
          <CustomTextField
            fullWidth
            variant="outlined"
          />
          <Typography variant="h3">
            Note
          </Typography>
          <CustomTextField
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            className={classes.noteTextField}
          />
        </Stack>
        <div className={classes.btnContainer}>
          <Grid
            md={4}
          >
            <Button
              variant="container"
              className={classes.createBtn}
            >
              <Typography variant="h3">
                Create Event
              </Typography>
            </Button>
          </Grid>
        </div>
      </Container>
    </Page>
  )
}

export default observer(CreateEvent)
