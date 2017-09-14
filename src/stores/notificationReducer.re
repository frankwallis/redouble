type notification = {id: int, severity: string, title: string, message: string};

type state = list notification;
type action = Notify (string, string, string) | Dismiss int;
let initialState () => [];
let counter = ref 0;
let nextId () => {
  incr counter;
  !counter
};
let reducer state action =>
  switch action {
  | Notify (severity, title, message) => [{id: nextId (), severity, title, message}, ...state]
  | Dismiss id => List.filter (fun not => not.id != id) state
  };
