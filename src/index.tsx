import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store, { persist } from 'store'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
