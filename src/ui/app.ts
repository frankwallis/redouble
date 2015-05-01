/// <reference path="../_references.d.ts" />
//import {BrowserDOMAdapter} from 'angular2/src/core/browser_adapter';
declare var require: any;
var BrowserDomAdapter = require('angular2/src/dom/browser_adapter.js').BrowserDomAdapter;
BrowserDomAdapter.makeCurrent();

import {bootstrap, Component, Directive, View, Foreach, If, Switch, SwitchWhen, SwitchDefault} from 'angular2/angular2.js';
import {SettingsView} from './settings/settings';
import {TableView} from './table/table';
import {GrowlContainer} from './growl/growl';

@View({
  //url: 'src/ui/app.html',
  templateUrl: 'src/ui/app.html',
  // inline: `<div class="greeting">{{greeting}} <span red>world</span>!</div>
  //          <button class="changeButton" (click)="changeGreeting()">change greeting</button>`,
  directives: [
     Foreach, If, Switch, SwitchWhen, SwitchDefault,
     SettingsView, TableView, GrowlContainer
  ]
})
@Component({
  selector: 'tower-app',
  injectables: []
})
export class App {
   constructor() {
      console.log("running");
      this.state = { route: "settings" };
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
