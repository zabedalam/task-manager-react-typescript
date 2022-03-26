import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import reportWebVitals from './scripts/reportWebVitals';
import store from './store';

ReactDOM.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    </React.StrictMode>,
    document.querySelector('#root'),
);

reportWebVitals();
