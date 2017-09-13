type state = {
  notifications: NotificationReducer.state,
  game: GameReducer.state
};
type action = [ NotificationReducer.action | GameReducer.action ];
let initialState () => {
  notifications: NotificationReducer.initialState (),
  game: GameReducer.initialState (),
};
let reducer action state => {
  switch action {
    | #GameReducer.action as gameAction => {...state, game: GameReducer.reducer gameAction state.game }
    | #NotificationReducer.action as notificationAction => {...state, notifications: NotificationReducer.reducer notificationAction state.notifications }
    | _ => state
  }
};

/*module type AllReducers2 = module type of NotificationReducer;*/

module AllReducers = {
  /*let notifications = NotificationReducer.NotificationReducer;*/
  /*include NotificationReducer.NotificationReducer;*/
  /* let a: (module AllReducers2) = (module NotificationReducer);*/
  /*let b: (module NotificationReducer.NotificationReducer) = (module NotificationReducer.NotificationReducer);*/
};
/*module CombinedReducer = CombineReducer()*/
/*module RootReducers = struct {
    notifications: NotificationReducer.NotificationReducer;
  }*/
/*let a: (module Reducer.Reducer) = (module RootReducer);

  type al = {notifications: (module Reducer.Reducer)};

  module type AllReducers1 = {include module type of NotificationReducer.NotificationReducer;};

  module type AllReducers2 = module type of NotificationReducer.NotificationReducer;

  module AllReducers = {
    /*let notifications = NotificationReducer.NotificationReducer;*/
    /*include NotificationReducer.NotificationReducer;*/
    let a: (module AllReducers2) = (module NotificationReducer.NotificationReducer);
    /*let b: (module NotificationReducer.NotificationReducer) = (module NotificationReducer.NotificationReducer);*/
  };

  /*let NotificationReducerType = type of NotificationReducer.NotificationReducer;*/
  let a: (module AllReducers1) = (module NotificationReducer.NotificationReducer);
  /*[@@deriving combined]*/
  /*let all = {notifications: (module NotificationReducer.NotificationReducer)};*/
  /*module CombineReducers
           (ReducerRecord: al)
           :(Reducer.Reducer with type state = RootReducer.state and type action = RootReducer.action) => {

    module CombinedReducer = CombineReducers(all);*/*/
