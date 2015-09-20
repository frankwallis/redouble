import ReactDOM from 'react-dom';

import {createStore} from "./create-store";
import {createApp} from "./create-app";
import {createHistory} from 'history';

import 'normalize.css';
import 'purecss';
import 'font-awesome/css/font-awesome.css';

console.log("Received state " + JSON.stringify(global.__ISOMORPHIC_STATE__));

const store = createStore(global.__ISOMORPHIC_STATE__);
const history = createHistory();
const app = createApp(store, history);

ReactDOM.render(app, document.getElementById('main'));
