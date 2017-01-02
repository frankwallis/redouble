import React from 'react';

import routes from "./routes";
import {Router} from 'react-router';
import {Provider} from 'react-redux';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends React.Component {
	render() {
		return (
			<Provider store={this.props.store}>
				<Router history={this.props.history}>
					{routes}
				</Router>
			</Provider>
		);
	}
}

/* add support for drag and drop */
export default DragDropContext(HTML5Backend)(App);
