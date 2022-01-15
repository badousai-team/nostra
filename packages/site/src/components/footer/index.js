import React from 'react'
import Divider from '@mui/material/Divider'
import { makeStyles } from '@mui/styles'

import styles from './styles'
import Container from '../container'
import Link from '../link'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.containerWrapper}>
          <span style={{ fontSize: '1rem' }}>
            &copy; 2021 Nostra
          </span>
          <div className={classes.footerLink}>
            <Link href="/" className={classes.link}>
              Terms & Conditions
            </Link>
            <Divider className={classes.divider} orientation="vertical" flexItem />
            <Link href="/" className={classes.link}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
