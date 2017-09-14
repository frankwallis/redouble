type thunk 'state = ..;

type thunk 'state +=
  | Thunk (Reductive.Store.t (thunk 'state) 'state => unit);

/**
 * middleware that listens for a specific action and calls that function.
 * Allows for async actions.
 */
let middleware store next action =>
  switch action {
  | Thunk func => func store
  | _ => next action
  };