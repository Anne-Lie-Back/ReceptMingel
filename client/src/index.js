import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider as StyletronProvider} from "styletron-react";
import {Client as Styletron} from "styletron-engine-atomic"
import ApplicationContextProvider from './contexts';

const engine = new Styletron({
  hydrate: document.getElementsByClassName("_styletron_hydrate_")
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApplicationContextProvider>
        <StyletronProvider value={engine}>
          <App />
        </StyletronProvider>
      </ApplicationContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
