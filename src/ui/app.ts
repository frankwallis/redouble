/// <reference path="../_references.d.ts" />
import "reflect-metadata"

import {bootstrap, Component, View, NgFor, NgIf} from 'angular2/angular2';
import {SettingsView} from './settings/settings';
import {TableView} from './table/table';
import {GrowlContainer} from './growl/growl';

import 'normalize';
import 'purecss/build/pure.css!';
import 'font-awesome';

import './components/container.css';
import './navbar/navbar.css';
import './app.css';

@View({
  templateUrl: 'src/ui/app.html',
  directives: [
     NgFor, NgIf,
     SettingsView, TableView, GrowlContainer
  ]
})
@Component({
  selector: 'redouble-app'
})
export class App {
   constructor() {
      console.log("running");
      this.state = { route: "table" };
      this.routes = ["home", "table", "settings", "about"];
   }

   routeClicked ($event, newroute) {
      console.log('in routeClicked ' + newroute);
      $event.preventDefault();
      this.state = { route: newroute };
   }

   private state: any;
   private routes: Array<string>;
}

export function main() {
   // You can use the light dom of the <hello-app> tag as temporary content (for
   // example 'Loading...') before the application is ready.
   console.log('bootstrapping')
   bootstrap(App);
}
