module type Store = {
  type action;
  type state;
  let getState: unit => state;
  let dispatch: action => action;
};

module MakeStore (RootReducer: Reducer.Reducer) :(Store with type state = RootReducer.state) => {
  type action = RootReducer.action;
  type state = RootReducer.state;
  type stateHolder = {mutable content: state};
  let currentState = {content: RootReducer.getInitialState ()};
  let getState () => currentState.content;
  let dispatch next => {
    currentState.content = RootReducer.updater currentState.content next;
    next
  };
};
