import { createContext } from 'react'

import { rootStore } from 'site/stores'

const StoreContext = createContext(rootStore)

export {
  StoreContext,
}
