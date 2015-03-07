/* @flow */

import React from 'react';
import Reflux from 'reflux';

import {NotificationStore, NotificationActions} from "../../stores/notification-store";

/**
 * Component for displaying notifications from the
 * NotificationStore as growls
 */
export class GrowlContainer extends React.Component {

   constructor(props) {
      super(props);
   }

   componentDidMount() {
      this.unsubscribe = NotificationStore.listen(() => {
         this.forceUpdate();
      });
   }

   componentWillUnmount() {
      this.unsubscribe();
   }

   handleResponse(id, response) {
      NotificationActions.dismiss({id: id, response: response});
   }

   render() {
      console.log('rendering growls');

      var growls = NotificationStore.notifications.map((notification) => {
         var buttons = notification.buttons.map((button) => {
            return <a onClick={() => this.handleResponse(notification.id, button)}>{button}</a>
         });

         return (
            <li className={"growl-item growl-" + notification.type}
                onClick={() => this.handleResponse(notification.id, notification.defaultButton)}
                key={notification.id}>
               <h3 className="growl-title">{notification.title}</h3>
               <p className="growl-message">{notification.message}</p>
               <div className="growl-buttons">{buttons}</div>
            </li>
         );
      });

      return (
         <ol className="growl-list">
            {growls}
         </ol>
      );
   }
}
