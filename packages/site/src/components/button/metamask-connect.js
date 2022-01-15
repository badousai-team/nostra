import React from 'react'
import { observer } from 'mobx-react'
import Button from '@mui/material/Button'

import { useStores } from 'site/hooks'

const MetamaskConnect = (props) => {
  const { accountStore } = useStores()

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => accountStore.setLoginDialog(true)}
      style={{ borderRadius: 50 }}
      {...props}
    >
      Connect Wallet
    </Button>
  )
}

export default observer(MetamaskConnect)
