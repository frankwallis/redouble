import {bootstrap, Component, Decorator, Template, NgElement, Foreach, Switch, SwitchWhen, SwitchDefault} from 'angular2/angular2';
import {SettingsView} from './settings/settings';
import {TableView} from './table/table';
// import {GrowlContainer} from './growl/growl.jsx';

@Component({
  // The Selector prop tells Angular on which elements to instantiate this
  // class. The syntax supported is a basic subset of CSS selectors, for example
  // 'element', '[attr]', [attr=foo]', etc.
  selector: 'hello-app',
  // These are services that would be created if a class in the component's
  // template tries to inject them.
  services: []//[GreetingService]
})
// The template for the component.
@Template({
  // Expressions in the template (like {{greeting}}) are evaluated in the
  // context of the HelloCmp class below.
  url: 'src/ui/app.html',
  // inline: `<div class="greeting">{{greeting}} <span red>world</span>!</div>
  //          <button class="changeButton" (click)="changeGreeting()">change greeting</button>`,
  // All directives used in the template need to be specified. This allows for
  // modularity (RedDec can only be used in this template)
  // and better tooling (the template can be invalidated if the attribute is
  // misspelled).
  directives: [Foreach, Switch, SwitchWhen, SwitchDefault, SettingsView, TableView]//[RedDec]
})

export class App {
   constructor() {
      this.state = { route: "table" };
      this.routes = ["home", "table", "settings", "about"];
   }

   routeClicked($event, newroute) {
      console.log('in routeClicked');
      $event.preventDefault();
      this.state = { route: newroute };
   }
}

export function main() {
  // Bootstrapping only requires specifying a root component.
  // The boundary between the Angular application and the rest of the page is
  // the shadowDom of this root component.
  // The selector of the component passed in is used to find where to insert the
  // application.
  // You can use the light dom of the <hello-app> tag as temporary content (for
  // example 'Loading...') before the application is ready.
  bootstrap(App);
}
