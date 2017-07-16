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

module type AllReducers2 = module type of NotificationReducer.NotificationReducer;

module AllReducers = {
  /*let notifications = NotificationReducer.NotificationReducer;*/
  /*include NotificationReducer.NotificationReducer;*/
  let a: (module AllReducers2) = (module NotificationReducer.NotificationReducer);
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
