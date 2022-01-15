import React from 'react'
import { observer } from 'mobx-react'

const Protected = ({ children, forceBlock = false }) => {
  return (!forceBlock) ? children : (
    <div style={{ padding: '1rem', color: 'grey', fontSize: '0.9rem', textAlign: 'center' }}>
      Your account level is not allowed to view this data / perform this action
    </div>
  )
}

export default observer(Protected)
