import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import history from './utils/history';
import getConfig from './config';
import { ToDoApiProvider } from './utils/useToDoApi';

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname,
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/auth0provideroptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  onRedirectCallback,
};

ReactDOM.render(
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Auth0Provider {...providerConfig}>
    <ToDoApiProvider>
      <App />  
    </ToDoApiProvider>
  </Auth0Provider>,
  document.getElementById('root'),
);
