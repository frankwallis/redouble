/// <reference path="../../_references.d.ts" />

import {Component, View, Foreach} from 'angular2/angular2.js';
import {NotificationService} from "../../services/notification-service";

/**
 * Component for displaying notifications from the
 * NotificationStore as growls
 */
@Component({
   selector: 'growler',
   services: [NotificationService]
})
@View({
   url: 'src/ui/growl/growl.html',
   directives: [Foreach]
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
