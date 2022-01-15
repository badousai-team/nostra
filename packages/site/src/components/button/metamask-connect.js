import React from 'react'
import { observer } from 'mobx-react'
import Button from '@mui/material/Button'

import { useStores } from 'site/hooks'

const MetamaskConnect = (props) => {
  const { accountStore } = useStores()

  return (
    <Button
      variant="text"
      color="primary"
      onClick={() => accountStore.setLoginDialog(true)}
      {...props}
    >
      Connect
    </Button>
  )
}

export default observer(MetamaskConnect)
