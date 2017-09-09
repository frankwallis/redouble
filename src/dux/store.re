module type Store = {
  type action;
  type state;
  let getState: unit => state;
  let dispatch: action => unit;
  let subscribe: (unit => unit) => unit;
};

module MakeStore
       (RootReducer: Reducer.Reducer)
       :(Store with type state = RootReducer.state and type action = RootReducer.action) => {
  type action = RootReducer.action;
  type state = RootReducer.state;
  type stateHolder = {mutable content: state, mutable subscribers: list (unit => unit)};
  let currentState = {content: RootReducer.initialState (), subscribers: []};
  let getState () => currentState.content;
  let subscribe subscriber => currentState.subscribers = [subscriber, ...currentState.subscribers];
  let dispatch next => {
    currentState.content = RootReducer.reducer next currentState.content;
    List.iter (fun subscriber => subscriber ()) currentState.subscribers
  };
};
