type notification = {id: string, severity: string, title: string, message: string};

module NotificationReducer: Reducer.Reducer = {
  type state = list notification;
  type action =
    | Create notification
    | Dismiss string;
  let getInitialState () => [];
  let updater state action =>
    switch action {
    | Create notification => [notification, ...state]
    | Dismiss id => List.filter (fun not => not.id == id) state
    };
};
