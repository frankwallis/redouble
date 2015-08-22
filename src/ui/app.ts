/// <reference path="../_references.d.ts" />
import "reflect-metadata"

import {
	bootstrap, bind, 
	Component, View
} from 'angular2/angular2';

import {
	routerInjectables, RouteConfig, Route,
	Location, HTML5LocationStrategy, LocationStrategy,
	RouterOutlet, RouterLink
} from 'angular2/router';

import {SettingsView} from './settings/settings';
import {TableView} from './table/table';
import {GrowlContainer} from './growl/growl';

import 'normalize';
import 'purecss/build/pure.css!';
import 'font-awesome';

import './components/container.css';
import './navbar/navbar.css';
import './app.css';
import appTemplate from "./app.html";

@View({
  template: appTemplate,
  directives: [
     RouterOutlet, RouterLink,
     SettingsView, TableView, GrowlContainer
  ]
})
@Component({
  selector: 'redouble-app'
})
@RouteConfig([
  new Route({path: '/', component: TableView, as: 'table'}),
  new Route({path: '/settings', component: SettingsView, as: 'settings'})
])
export class App {
	constructor(private location: Location) {
		console.log("running");
   }

   tableActive() { return this.location.path() == ''; }
  	settingsActive() { return this.location.path() == '/settings'; }
}

export function main() {
   console.log('bootstrapping');
   bootstrap(App, [routerInjectables, bind(LocationStrategy).toClass(HTML5LocationStrategy)]);
}
