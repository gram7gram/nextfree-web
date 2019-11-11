import {applyMiddleware, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from 'history'
import Cookie from 'js-cookie'

import {prepareTranslations} from './i18n'
import sagas from './sagas'
import reducers from './reducers'
import LoginCheck from './screens/Login/actions/LoginCheck'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

let middleware = [promise, thunk, sagaMiddleware, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let locale = Cookie.get('locale')
if (!locale) {
  locale = 'ua'
}

let token = Cookie.get('token')
if (!token) {
  token = null
}

const initial = {
  App: {
    isAuthenticated: !!token,
    isLoadingVisible: !!token,
    token,
    locale,
  }
}

export default () => {

  const store = createStore(
    reducers(history),
    initial,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )

  sagaMiddleware.run(sagas)

  prepareTranslations(locale)

  if (token) {
    store.dispatch(LoginCheck({token}))
  }

  return store
}
