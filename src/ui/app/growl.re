open NotificationReducer;

external require : string => unit = "require" [@@bs.val];
require "./growl.css";

let component = ReasonReact.statelessComponent "BiddingBox";

let make ::notifications ::handleResponse _children => {
  ...component,
  render: fun _self => {
    let handleClick notif _ => handleResponse notif;
    let renderItem notif =>
      <li
        className=("growl-item growl-" ^ notif.severity)
        onClick=(handleClick notif.id)
        key=(string_of_int notif.id)>
        <h3 className="growl-title"> (ReasonReact.stringToElement notif.title) </h3>
        <p className="growl-message"> (ReasonReact.stringToElement notif.message) </p>
        <div className="growl-buttons" />
      </li>;
    <ol className="growl-list">
      (ReasonReact.arrayToElement (Array.of_list (List.map renderItem notifications)))
    </ol>
  }
};