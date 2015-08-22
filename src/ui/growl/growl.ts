/// <reference path="../../_references.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';
import {NotificationService} from "../../services/notification-service";

/**
 * Component for displaying notifications from the
 * NotificationStore as growls
 */
@Component({
   selector: 'growler',
   viewBindings: [NotificationService]
})
@View({
   templateUrl: 'src/ui/growl/growl.html',
   directives: [NgFor]
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
