import {bootstrap, Component, Template, Foreach, Switch, SwitchWhen, SwitchDefault} from 'angular2/angular2';
import {SettingsView} from './settings/settings';
import {TableView} from './table/table';
import {GrowlContainer} from './growl/growl';

@Component({
  selector: 'hello-app',
  services: []
})
@Template({
  url: 'src/ui/app.html',
  // inline: `<div class="greeting">{{greeting}} <span red>world</span>!</div>
  //          <button class="changeButton" (click)="changeGreeting()">change greeting</button>`,
  directives: [Foreach, Switch, SwitchWhen, SwitchDefault, SettingsView, TableView, GrowlContainer]
})

export class App {
   constructor() {
      this.state = { route: "settings" };
      this.routes = ["home", "table", "settings", "about"];
   }

   routeClicked($event, newroute) {
      console.log('in routeClicked ' + newroute);
      $event.preventDefault();
      this.state = { route: newroute };
   }
}

export function main() {
  // You can use the light dom of the <hello-app> tag as temporary content (for
  // example 'Loading...') before the application is ready.
  bootstrap(App);
}
