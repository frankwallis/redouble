NodeUtils.require "./controlBar.css";

let component = ReasonReact.statelessComponent "ControlBar";

let make ::pause ::canPause ::resume ::canResume ::back ::canBack ::forward ::canForward ::jumpBack ::canJumpBack _children => {
  let barButton buttonClass action enabled => {
    let disabled = not enabled;
    let className = "control-bar-button " ^ buttonClass ^ (disabled ? " disabled" : "");
    <button className disabled=(Js.Boolean.to_js_boolean disabled) onClick=(fun _evt => action ()) />
  };
  {
    ...component,
    render: fun _self => {
      let buttons = [
        barButton "btn-jump-back" jumpBack canJumpBack,
        barButton "btn-back" back canBack,
        barButton "btn-resume" resume canResume,
        barButton "btn-pause" pause canPause,
        barButton "btn-forward" forward canForward
      ];

      let buttonItems = List.mapi (fun idx button =>
        <li className="control-bar-item" key=(string_of_int idx)> button </li>
      ) buttons;

      <ul className="control-bar-container">
        (ReasonReact.arrayToElement (Array.of_list buttonItems))
      </ul>
    }
  }
};