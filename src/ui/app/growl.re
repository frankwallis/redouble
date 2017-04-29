external require : string => unit = "require" [@@bs.val];

require "ui/app/growl.css";

type notification = {id: string, severity: string, title: string, message: string};

module Growl = {
  include ReactRe.Component;
  type props = {notifications: list notification, handleResponse: notification => unit};
  let name = "Growl";
  let render {props} => {
    let handleClick notif _ => props.handleResponse notif;
    let renderItem notif =>
      <li
        className=("growl-item growl-" ^ notif.severity) onClick=(handleClick notif) key=notif.id>
        <h3 className="growl-title"> (ReactRe.stringToElement notif.title) </h3>
        <p className="growl-message"> (ReactRe.stringToElement notif.message) </p>
        <div className="growl-buttons" />
      </li>;
    <ol className="growl-list">
      (ReactRe.arrayToElement (Array.of_list (List.map renderItem props.notifications)))
    </ol>
  };
};

include ReactRe.CreateComponent Growl;

let createElement ::notifications ::handleResponse => wrapProps {notifications, handleResponse};
