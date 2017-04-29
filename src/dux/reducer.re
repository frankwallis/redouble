module type Reducer = {
  type state;
  type action;
  let getInitialState: unit => state;
  let updater: state => action => state;
};
