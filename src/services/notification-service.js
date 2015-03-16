
/**
 * Store for showing notifications to the user and
 * optionally receiving a response. Notifications are
 * assigned a unique id which can be used to dismiss them.
 */
var instance = null;

class Deferred {
   constructor() {
      this.promise = new Promise((resolve, reject) => {
         this.resolve = resolve;
         this.reject = reject;
      })
   }
}

export class NotificationService {
   constructor() {
      this.notifications = [];
      this.currentId = 1;

      setInterval(() => {
         this.autoDismiss();
      }, 7500);

      instance = this;
   }

   static instance() {
      return instance;
   }

   autoDismiss() {
      var now = new Date();
      this.notifications.forEach((notif) => {
         if (!notif.dismissed && !(notif.type == 'question')) {
            if (now.getTime() - notif.timestamp.getTime() > 10000) {
               setTimeout(() => this.dismiss({ id: notif.id }), 0);
            }
         }
      })
   }

   info(opts) {
      opts = opts || {};
      opts.type = 'info';

      return this.notify(opts);
   }

   warn(opts) {
      opts = opts || {};
      opts.type = 'warn';

      return this.notify(opts);
   }

   error(opts) {
      opts = opts || {};
      opts.type = 'error';

      return this.notify(opts);
   }

   question(opts) {
      opts = opts || {};
      opts.type = 'question';
      opts.timeout = opts.timeout || -1;

      return this.notify(opts);
   }

   success(opts) {
      opts = opts || {};
      opts.type = 'success';

      return this.notify(opts);
   }

   notify(opts) {
      var notification = {};
      notification.id = this.generateId();
      notification.timestamp = new Date();
      notification.source = opts.source;
      notification.type = opts.type;
      notification.title = opts.title;
      notification.timeout = opts.timeout || 20000;
      notification.message = opts.message;
      notification.buttons = opts.buttons || [];
      notification.defaultButton = opts.defaultButton;
      notification.deferred = new Deferred();
      this.notifications.push(notification);
      return notification.deferred.promise;
   }

   dismiss(opts) {
      var notification = this.notifications.filter((notif) => notif.id == opts.id)[0];

      if (notification) {
         this.notifications = this.notifications.filter((notif) => notif.id != opts.id);
         notification.response = opts.response;
         notification.deferred.resolve(notification);
      }
   }

   generateId() {
      return this.currentId ++;
   }
}
