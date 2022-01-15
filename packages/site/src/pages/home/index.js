import React from 'react'
import { observer } from 'mobx-react'

// Material UI
import makeStyles from '@mui/styles/makeStyles'

// common component
import Page from 'site/components/page'
import Container from 'site/components/container'
import styles from './styles'

const useStyles = makeStyles(styles)

const Home = () => {
  const classes = useStyles()

  return (
    <Page className={classes.page}>
      <Container className={classes.container}>
        Home
      </Container>
    </Page>
  )
}

export default observer(Home)
