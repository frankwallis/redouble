/* @flow */

import Reflux from 'reflux';

export const NotificationActions = Reflux.createActions([
   "info",
   "warn",
   "error",
   "question",
   "success",
   "notify",
   "dismiss"
]);

/**
 * Store for showing notifications to the user and
 * optionally receiving a response. Notifications are
 * assigned a unique id which can be used to dismiss them.
 */
export const NotificationStore = Reflux.createStore({
   init: function() {
      this.listenToMany(NotificationActions);
      this.notifications = [];
      this.currentId = 1;

      setInterval(() => {
         this.autoDismiss();
      }, 7500);
   },
   autoDismiss: function() {
      let now = new Date();
      this.notifications.forEach((notif) => {
         if (!notif.dismissed && !(notif.type == 'question')) {
            if (now.getTime() - notif.timestamp.getTime() > 10000) {
               NotificationActions.dismiss({ id: notif.id });
            }
         }
      })
   },
   onInfo: function(opts) {
      opts = opts || {};
      opts.type = 'info';

      let notification = this.notify(opts);
      this.trigger(notification);
   },
   onWarn: function(opts) {
      opts = opts || {};
      opts.type = 'warn';

      let notification = this.notify(opts);
      this.trigger(notification);
   },
   onError: function(opts) {
      opts = opts || {};
      opts.type = 'error';

      let notification = this.notify(opts);
      this.trigger(notification);
   },
   onQuestion: function(opts) {
      opts = opts || {};
      opts.type = 'question';
      opts.timeout = opts.timeout || -1;

      let notification = this.notify(opts);
      this.trigger(notification);
   },
   onSuccess: function(opts) {
      opts = opts || {};
      opts.type = 'success';

      let notification = this.notify(opts);
      this.trigger(notification);
   },
   onNotify: function(opts) {
      let notification = this.notify(opts);
      this.trigger(notification);
   },
   notify: function(opts) {
      let notification = {};
      notification.id = this.generateId();
      notification.timestamp = new Date();
      notification.source = opts.source;
      notification.type = opts.type;
      notification.title = opts.title;
      notification.timeout = opts.timeout || 20000;
      notification.message = opts.message;
      notification.buttons = opts.buttons || [];
      notification.defaultButton = opts.defaultButton;
      this.notifications.push(notification);
      return notification;
   },
   onDismiss: function(opts) {
      let notification = this.notifications.filter((notif) => notif.id == opts.id)[0];

      if (notification) {
         this.notifications = this.notifications.filter((notif) => notif.id != opts.id);
         notification.response = opts.response;
         this.trigger(notification);
      }
   },
   generateId: function() {
      return this.currentId ++;
   }

});
