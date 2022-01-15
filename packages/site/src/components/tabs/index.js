import React from 'react'
import { makeStyles } from '@mui/styles'
import {
  Tabs,
  Tab,
} from '@mui/material'

import styles from './styles'

const useStyles = makeStyles(styles)

const CustomizedTabs = ({
  activeTab,
  handleChangeTab,
  labels,
  ...others
}) => {
  const classes = useStyles()

  return (
    <Tabs
      classes={{
        indicator: classes.tabsIndicator,
      }}
      variant="fullWidth"
      value={activeTab}
      onChange={handleChangeTab}
      {...others}
    >
      {labels.map((label) => (
        <Tab
          key={label}
          label={label}
          classes={{
            root: classes.tab,
            selected: classes.tabSelected,
          }}
        />
      ))}
    </Tabs>
  )
}

export default CustomizedTabs
