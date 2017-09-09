module type Reducer = {
  type state;
  type action;
  let initialState: unit => state;
  let reducer: action => state => state;
};
