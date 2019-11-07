import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';

import configureStore, {history} from './store';

import {ConnectedRouter} from 'connected-react-router'
import {createRouter} from './router';

import 'react-toastify/dist/ReactToastify.min.css';
import 'bootswatch/dist/slate/bootstrap.min.css';
import './style/style.css';

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

  window.location.reload()
}
