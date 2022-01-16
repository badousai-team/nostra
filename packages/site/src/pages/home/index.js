import React from 'react'
import { observer } from 'mobx-react'

// Material UI
import makeStyles from '@mui/styles/makeStyles'
import {
  Grid,
  Typography,
} from '@mui/material'

// common component
import Page from 'site/components/page'
import CustomCard from 'site/components/card'
import Container from 'site/components/container'
import styles from './styles'

const useStyles = makeStyles(styles)

const data = [
  {
    id: '1',
    status: 'open',
    title: 'Who is the winner of the voice?',
    firstNFT: 'https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg',
    secondNFT: 'https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg',
    total: '321.4',
    day: '09',
    hour: '07',
    minute: '09',
  },
  {
    id: '2',
    status: 'waiting for resolution',
    title: 'Will Covid cases increase by the end of this month?',
    firstNFT: 'https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg',
    secondNFT: 'https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg',
    total: '321.4',
    day: '09',
    hour: '07',
    minute: '09',
  },
  {
    id: '3',
    status: 'ended',
    title: 'Who is the winner of the voice?',
    firstNFT: 'https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg',
    secondNFT: 'https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg',
    total: '321.4',
    day: '09',
    hour: '07',
    minute: '09',
  },
  {
    id: '4',
    status: 'ended',
    title: 'Will Covid cases increase by the end of this month?',
    firstNFT: 'https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg',
    secondNFT: 'https://www.bastiaanmulder.nl/wp-content/uploads/2013/11/dummy-image-square.jpg',
    total: '321.4',
    day: '09',
    hour: '07',
    minute: '09',
  },
]

const Home = () => {
  const classes = useStyles()

  return (
    <Page className={classes.page}>
      <Container className={classes.container}>
        <Typography
          variant="h1"
          className={classes.title}
        >
          Events
        </Typography>
        <Grid
          container
          spacing={{ xs: 0.5, sm: 1, md: 2, lg: 4 }}
        >
          {data.map((item) => (
            <CustomCard
              key={item.id}
              data={item}
            />
          ))}
        </Grid>
      </Container>
    </Page>
  )
}

export default observer(Home)
