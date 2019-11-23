import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';

import configureStore, {history} from './store';

import {ConnectedRouter} from 'connected-react-router'
import {createRouter} from './router';

import 'react-toastify/dist/ReactToastify.min.css';
import 'bootswatch/dist/slate/bootstrap.min.css';
import './style/style.css';

import * as Sentry from '@sentry/browser';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({dsn: "https://b5dbf33ef1f244bb9e93b55b22b13991@sentry.io/1831992"});
  Sentry.setExtra('domain', 'staff.nextfree.com.ua')
}

const rootElement = document.getElementById('root');

try {
  const store = configureStore()

  const App = <Provider store={store}>
    <ConnectedRouter history={history}>

      {createRouter(store)}

    </ConnectedRouter>
  </Provider>

  render(App, rootElement);

} catch (e) {
  console.error(e)

  Sentry.captureException(e)

  window.location.reload()
}
