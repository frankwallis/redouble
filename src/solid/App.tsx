import type { Component } from 'solid-js';
import { Routes, Route, Router } from "solid-app-router"
import { About } from './about/About';
import { Main } from './main/Main';
import { Table } from './table/Table';

export const App: Component = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" component={Main}>
					 <Route path="/" component={Table} />
				{/*<Route path="ui/settings" component={SettingsView} /> */}
					<Route path="ui/about" component={About} />
				</Route>
			</Routes>
		</Router>
	);
};
