type notification = {
  id: int,
  severity: string,
  title: string,
  message: string
};

type state = {
  items: list(notification),
  busyCounter: int,
  nextId: int
};

type action =
  | Notify(string, string, string)
  | Dismiss(int)
  | Busy
  | Idle;

let initialState = {items: [], busyCounter: 0, nextId: 1};

let reducer = (state, action) =>
  switch action {
  | Notify(severity, title, message) => {
      ...state,
      items: [{id: state.nextId, severity, title, message}, ...state.items],
      nextId: state.nextId + 1
    }
  | Dismiss(id) => {...state, items: List.filter(item => item.id != id, state.items)}
  | Busy => {...state, busyCounter: succ(state.busyCounter)}
  | Idle => {...state, busyCounter: max(0, pred(state.busyCounter))}
  };

let isBusy = (state) => state.busyCounter > 0;
