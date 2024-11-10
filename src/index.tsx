import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { store } from './Redux/store';
import { Provider } from 'react-redux';

const rootElm = document.getElementById('root')
if (rootElm) {
    const root = ReactDOM.createRoot(rootElm);
    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    );
}

