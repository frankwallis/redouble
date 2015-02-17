/// <reference path="./_references.d.ts" />

import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.levels.debug);

export function configure(aurelia) {
  aurelia.use
    .defaultBindingLanguage()
    .defaultResources()
    .router()
    .eventAggregator()
    .atscript()
//    .plugin('./path/to/plugin');


  aurelia.start().then(a => a.setRoot('ui/app', document.body));
}
