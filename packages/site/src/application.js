import React, { useState, useEffect } from 'react'
import { reaction, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { styled } from '@mui/material/styles'

import { DISABLE_LOGIN } from 'site/config'
import eventEmitter from 'site/utils/event'
import { useStores } from 'site/hooks'
import { Routes } from 'site/routes'

import Header from 'site/components/header'
import Footer from 'site/components/footer'

import NotificationBar from 'site/components/notification-bar'
import ModalLogin from './components/modal/login'

const RootMain = styled('main')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.color.background,
}))

const App = () => {
  const {
    accountStore,
    appStore,
    notificationStore,
  } = useStores()

  const [error, setError] = useState('')

  useEffect(() => {
    if (
      !DISABLE_LOGIN &&
      window.localStorage.getItem('connectorId') === 'injected'
    ) {
      accountStore.session()
    }

    eventEmitter.on('NOTIF_ERROR', (errMessage) => {
      notificationStore.pushError(errMessage)
    })

    reaction(
      () => notificationStore.errors.length,
      () => {
        if (notificationStore.errors.length === 0) return
        const err = toJS(notificationStore.errors[0])
        if (err && err.message === 'silent') {
          notificationStore.shiftError()
        } else {
          setError((err && err.message) ? err.message : err)
        }
      },
    )
  }, [])

  const onCloseError = () => {
    setError('')
    notificationStore.shiftError()
  }

  return (
    <RootMain>
      <Header />
      <Routes />
      <Footer />
      <NotificationBar
        severity="error"
        open={!!error}
        message={error}
        onClose={onCloseError}
      />
      <NotificationBar
        severity="success"
        open={!!notificationStore.success}
        message={notificationStore.success}
        onClose={notificationStore.clearSuccess}
      />
      <ModalLogin />
    </RootMain>
  )
}

export default observer(App)
