open NotificationReducer;

NodeUtils.require("./Growl.css");

module GrowlItem = {
  [@react.component]
  let make = (~notification, ~dismiss) => {
    <li
      className=("growl-item growl-" ++ notification.severity)
      onClick=((_) => dismiss(notification.id))>
      <h3 className="growl-title"> (ReasonReact.string(notification.title)) </h3>
      <p className="growl-message"> (ReasonReact.string(notification.message)) </p>
      <div className="growl-buttons" />
    </li>;
  };
};

[@react.component]
let make = (~notifications, ~dismiss) => {
  <ol className="growl-list">
    (ReasonReact.array(Array.of_list(List.map(notification => <GrowlItem key=string_of_int(notification.id) notification dismiss />, notifications))))
  </ol>
};
