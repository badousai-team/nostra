import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import {
  Breadcrumbs,
  Typography,
} from '@mui/material'

import Link from 'site/components/link'

import styles from './styles'

const useStyles = makeStyles(styles)

const BreadcrumbsNav = () => {
  const classes = useStyles()
  return (
    <div className={classes.breadcrumbsDiv}>
      <Breadcrumbs
        aria-label="breadcrumb"
        className={classes.breadcrumbs}
      >
        <Link
          underline="hover"
          color="textPrimary"
          href="/"
        >
          Home
        </Link>
        <Typography
          color="textPrimary"
          className={classes.currentBreadcrumb}
        >
          Add projects
        </Typography>
      </Breadcrumbs>
    </div>
  )
}

export default BreadcrumbsNav
