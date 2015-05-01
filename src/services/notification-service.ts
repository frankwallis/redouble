/// <reference path="../_references.d.ts" />

import {Injectable} from 'angular2/di.js';

/**
 * Store for showing notifications to the user and
 * optionally receiving a response. Notifications are
 * assigned a unique id which can be used to dismiss them.
 */
var instance = null;

class Deferred<T> {
   constructor() {
      this.promise = new Promise<T>((resolve, reject) => {
         this.resolve = resolve;
         this.reject = reject;
      })
   }
   public promise: Promise<T>;
   public resolve: (res: T) => void;
   public reject: (err: any) => void;   
}

export interface INotification {
   id: number;
   timestamp: Date;
   source: any;
   type: string;
   title: string;
   timeout: number;
   message: string;
   buttons: Array<string>;
   defaultButton: string;
   deferred: Deferred<any>;
   response: string;
   dismissed: boolean;
}

//@Injectable()
export class NotificationService {
   constructor() {
      if (!instance)
         instance = this;
      else
         return instance;

      this.notifications = [];
      this.currentId = 1;

      //setInterval(() => {
      //   this.autoDismiss();
      //}, 7500);
   }

   public notifications: Array<INotification>;
   private currentId: number;
   
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
      var notification: INotification = <any> {};
      notification.id = this.generateId();
      notification.timestamp = new Date();
      notification.source = opts.source;
      notification.type = opts.type;
      notification.title = opts.title;
      notification.timeout = opts.timeout || 20000;
      notification.message = opts.message;
      notification.buttons = opts.buttons || [];
      notification.defaultButton = opts.defaultButton;
      notification.deferred = new Deferred<any>();
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
