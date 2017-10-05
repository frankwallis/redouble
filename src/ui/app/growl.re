open NotificationReducer;

NodeUtils.require "./growl.css";

let component = ReasonReact.statelessComponent "Growl";

let make ::notifications ::dismiss _children => {
  let renderItem notif => {
    <li
      className=("growl-item growl-" ^ notif.severity)
      onClick=(fun _ => dismiss notif.id)
      key=(string_of_int notif.id)>
      <h3 className="growl-title"> (ReasonReact.stringToElement notif.title) </h3>
      <p className="growl-message"> (ReasonReact.stringToElement notif.message) </p>
      <div className="growl-buttons" />
    </li>
  };
  {
    ...component,
    render: fun _self => {
      <ol className="growl-list">
        (ReasonReact.arrayToElement (Array.of_list (List.map renderItem notifications)))
      </ol>
    }
  }
};