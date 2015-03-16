import {Component, Template, Foreach} from 'angular2/angular2';
import {NotificationService} from "../../services/notification-service";

/**
 * Component for displaying notifications from the
 * NotificationStore as growls
 */
@Component({
   selector: 'growler',
   services: [NotificationService]
})
@Template({
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
}
