import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from "./create-store";
import {createHistory} from 'history';
import App from "./app";

import 'normalize.css';
import 'purecss';
import 'font-awesome/css/font-awesome.css';

console.log("Received state " + JSON.stringify(global.__ISOMORPHIC_STATE__));

const store = createStore(global.__ISOMORPHIC_STATE__);
const history = createHistory();

ReactDOM.render(<App store={store} history={history} />, document.getElementById('main'));
