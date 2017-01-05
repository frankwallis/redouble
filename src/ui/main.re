/* TODO find out why this does not work */
let nrequire : Js.undefined Node.node_require = [%bs.node require];
let b = nrequire "./main.css";

[%%bs.raw{|
  require("./main.css");
|}];

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
