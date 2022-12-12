import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as UrqlProvider, createClient } from 'urql';
import * as serviceWorker from './serviceWorker';

const client = createClient({
  url: 'https://rickandmortyapi.com/graphql',
});

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <UrqlProvider value={client}>
        <App />
      </UrqlProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Comment
serviceWorker.unregister();
