/// <reference path="./_references.d.ts" />

import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';
import {ConventionalView} from 'aurelia-framework';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.levels.debug);

ConventionalView.convertModuleIdToViewUrl = function(moduleId){
  return moduleId + '.html';//.replace('view-models', 'views') + '.html';
}

export function configure(aurelia) {
  aurelia.use
    .defaultBindingLanguage()
    .defaultResources()
    .router()
    .eventAggregator()
    .atscript()
//    .plugin('./path/to/plugin');

  aurelia.start().then(a => a.setRoot('ui/test', document.body));
}
