type notification = {id: int, severity: string, title: string, message: string};

type state = {
  items: list notification,
  nextId: int
};

type action =
  | Notify string string string
  | Dismiss int;

let initialState = {
  items: [],
  nextId: 1
};

let reducer state action =>
  switch action {
  | Notify severity title message => { items: [{id: state.nextId, severity, title, message}, ...state.items], nextId: (state.nextId +1) }
  | Dismiss id => { ...state, items: (List.filter (fun not => not.id != id) state.items) }
  };
