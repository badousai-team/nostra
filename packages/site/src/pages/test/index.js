import React from 'react'
import { observer } from 'mobx-react'
import Big from 'big.js'

import {
  Button,
} from '@mui/material'

import { TOKEN_ADDR, WEI, GAS_LIMIT, GAS_PRICE, MAX_APPROVAL_VALUE } from '@nostra/contract/helper'
// ABIs
import erc20Abi from '@nostra/contract/abi/erc20ABI.json'

// common component
import Page from 'site/components/page'
import Container from 'site/components/container'

import { useStores } from 'site/hooks'

const Test = () => {
  const { accountStore } = useStores()
  const test = async () => {
    const token = new accountStore.web3App.eth.Contract(erc20Abi, TOKEN_ADDR)

  }

  return (
    <Page>
      <Container>
        <Button onClick={test}>
          Test
        </Button>
      </Container>
    </Page>
  )
}

export default observer(Test)
