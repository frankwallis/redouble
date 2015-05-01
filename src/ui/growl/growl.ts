/// <reference path="../../_references.d.ts" />

import {Component, View, For} from 'angular2/angular2.js';
import {NotificationService} from "../../services/notification-service";

/**
 * Component for displaying notifications from the
 * NotificationStore as growls
 */
@Component({
   selector: 'growler',
   injectables: [NotificationService]
})
@View({
   templateUrl: 'src/ui/growl/growl.html',
   directives: [For]
})

export class GrowlContainer {
   constructor(notificationService: NotificationService) {
      this.notificationService = notificationService;
   }

   handleResponse(id, response) {
      this.notificationService.dismiss({id: id, response: response});
   }
   
   private notificationService: NotificationService;
}
