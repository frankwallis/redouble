external require : string => unit = "require" [@@bs.val];
require ("./main.css");

module Main = {
  include ReactRe.Component.Stateful;
  type props = unit;
  type state = {clicks: int};
  let name = "Main";
  let getInitialState props => {clicks: 0};
  let handleClick event {state} => Some {clicks: state.clicks + 2};
  let render {state, updater} =>
    <div style={"color": "#444444", "WebkitUserSelect": "none", "paddingTop": "40px", "fontSize": "68px", "fontFamily": "Montserrat", "textAlign":"center"}>
      (ReactRe.stringToElement ("REASON REACT"))
    </div>;
};

include ReactRe.CreateComponent Main;

let createElement ::children => wrapProps () ::children;
