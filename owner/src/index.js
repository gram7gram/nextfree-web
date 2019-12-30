import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';

import configureStore, {history} from './store';

import {ConnectedRouter} from 'connected-react-router'
import {createRouter} from './router';

import 'react-toastify/dist/ReactToastify.min.css';
import 'bootswatch/dist/slate/bootstrap.min.css';
import './style/style.css';
import './style/qr-scan.css';
import './style/avatar.css';
import './style/steps.css';
import './style/id-input.css';

import * as Sentry from '@sentry/browser';
import TagManager from "react-gtm-module";
import parameters from "./parameters";

if (process.env.NODE_ENV === 'production') {
  Sentry.init({dsn: "https://0322a85cb1c847e7981ac15d8979f612@sentry.io/1839632"});
  Sentry.setTag('domain', 'owner.nextfree.com.ua')
}

try {
  if (parameters.gtm.enabled) {
    TagManager.initialize({
      gtmId: parameters.gtm.id
    })
  }
} catch (e) {
  console.log(e);
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
