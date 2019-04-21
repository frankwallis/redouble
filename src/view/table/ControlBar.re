NodeUtils.require("./ControlBar.css");

module BarButton {
  [@react.component]
  let make = (~className, ~action, ~enabled) => {
    let disabled = ! enabled;
    let className = "control-bar-button " ++ (className ++ (disabled ? " disabled" : ""));
    <button className disabled onClick=((_evt) => action()) />
  };
}

[@react.component]
let make =
    (
      ~pause,
      ~canPause,
      ~resume,
      ~canResume,
      ~back,
      ~canBack,
      ~forward,
      ~canForward,
      ~jumpBack,
      ~canJumpBack
    ) => {
  {
    let buttons = [
      <BarButton className="btn-jump-back" action=jumpBack enabled=canJumpBack />,
      <BarButton className="btn-back" action=back enabled=canBack />,
      <BarButton className="btn-resume" action=resume enabled=canResume />,
      <BarButton className="btn-pause" action=pause enabled=canPause />,
      <BarButton className="btn-forward" action=forward enabled=canForward />
    ];
    let buttonItems =
      List.mapi(
        (idx, button) => <li className="control-bar-item" key=(string_of_int(idx))> button </li>,
        buttons
      );
    <ul className="control-bar-container">
      (ReasonReact.array(Array.of_list(buttonItems)))
    </ul>
  }
};
