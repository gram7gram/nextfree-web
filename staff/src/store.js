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

import querystring from 'qs'

const getAccessToken = () => {

  const query = querystring.parse(window.location.search, {ignoreQueryPrefix: true})

  let token = null

  if (query.accessToken) {
    try {
      token = window.atob(query.accessToken)
    } catch (ignore) {
    }

    delete query.accessToken

    window.location.search = '?' + querystring.stringify(query)
  }

  if (!token) {
    token = Cookie.get('token')
  }

  return token;
}

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

let middleware = [promise, thunk, sagaMiddleware, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let locale = Cookie.get('locale')
if (!locale) {
  locale = 'ua'
}

const token = getAccessToken()

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
