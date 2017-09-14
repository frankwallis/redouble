/*
 * Middleware api:
 * store: gives you access to state before and after the dispatch
 * next: the next function to call in the chain. Any middleware can be async.
 * action: this allows you to look for specific actions to operate on
 * return value can be used by the middleware that called you (optional)
 */

/**
 * logs the action before dispatching and the new state after.
 */
let middleware store next action => {
  Js.log action;
  let returnValue = next action;
  Js.log (Reductive.Store.getState store);
  returnValue
};