/* @refresh reload */
import { render } from 'solid-js/web';
import { App } from './App';

import 'normalize.css';
import 'purecss';
import 'font-awesome/css/font-awesome.css';
import './index.css';

render(() => <App />, document.getElementById('root') as HTMLElement);
