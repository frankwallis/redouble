module RootReducer = {
  type state = {notifications: NotificationReducer.NotificationReducer.state};
  type action = NotificationReducer.NotificationReducer.action;
  let getInitialState () => {
    notifications: NotificationReducer.NotificationReducer.getInitialState ()
  };
  let updater state action => {
    notifications: NotificationReducer.NotificationReducer.updater state.notifications action
  };
};
