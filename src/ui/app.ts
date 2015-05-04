/// <reference path="../_references.d.ts" />
import {bootstrap, Component, View, For, If, Switch, SwitchWhen, SwitchDefault} from 'angular2/angular2';
import {SettingsView} from './settings/settings';
import {TableView} from './table/table';
import {GrowlContainer} from './growl/growl';

@View({
  templateUrl: 'src/ui/app.html',
  directives: [
     For, If, Switch, SwitchWhen, SwitchDefault,
     SettingsView, TableView, GrowlContainer
  ]
})
@Component({
  selector: 'tower-app'
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
