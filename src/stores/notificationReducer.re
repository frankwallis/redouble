type notification = {id: int, severity: string, title: string, message: string};

module NotificationReducer = {
  type state = list notification;
  type action =
    | Create string string string
    | Dismiss int;
  let getInitialState () => [];
  let counter = ref 0;
  let nextId () => {
    incr counter;
    !counter
  };
  let updater state action =>
    switch action {
    | Create severity title message => [{id: nextId (), severity, title, message}, ...state]
    | Dismiss id => List.filter (fun not => not.id == id) state
    };
};
