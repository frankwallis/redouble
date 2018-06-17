NodeUtils.require("./spinner.css");

let component = ReasonReact.statelessComponent("Spinner");

let make = (_children) => {
  ...component,
  render: (_self) => <div className="spinner-container"> <div /> <div /> <div /> </div>
};
