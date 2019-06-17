import React from 'react'
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from '~/components/App'
import rootReducer from '~/reducers/rootReducer'
import { getPosts } from '~/actions/postAction'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)

store.dispatch(getPosts())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)