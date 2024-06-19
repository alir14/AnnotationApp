import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import "./mainStyle.css";
import store from './store';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import JS bundle which includes Popper for tooltips and popovers

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,

);

