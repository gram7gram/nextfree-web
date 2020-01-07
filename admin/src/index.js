import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';

import configureStore, {history} from './store';

import {ConnectedRouter} from 'connected-react-router'
import {createRouter} from './router';

import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootswatch/dist/slate/bootstrap.min.css';
import './style/style.css';
import './style/qr-scan.css';
import './style/avatar.css';
import './style/steps.css';
import './style/id-input.css';

import * as Sentry from '@sentry/browser';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({dsn: "https://0322a85cb1c847e7981ac15d8979f612@sentry.io/1839632"});
  Sentry.setTag('domain', 'admin.nextfree.com.ua')
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
