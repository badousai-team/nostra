import React from 'react'
import { useStores } from 'site/hooks'
import { observer } from 'mobx-react'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import styles from './styles'

const useStyle = makeStyles(styles)

const Account = () => {
  const { accountStore } = useStores()
  const classes = useStyle()

  return (
    <div className={classes.accountContainer}>
      <Typography className={classes.accountUsername}>
        {accountStore.user.username}
      </Typography>
    </div>
  )
}

export default observer(Account)
