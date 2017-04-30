external require : string => unit = "require" [@@bs.val];

require "ui/app/main.css";

require "ui/app/navbar.css";

module Main = {
  include ReactRe.Component.Stateful;
  type props = {
    theState: Program.PStore.state,
    dispatch: Program.PStore.action => Program.PStore.action
  };
  type state = {clicks: int};
  let name = "Main";
  let getInitialState props => {clicks: 0};
  let render {props} =>
    <div className="main-container">
      <nav role="navigation" className="main-navbar nav-main">
        <ul className="nav-site">
          <li key="table"> <a href="/"> (ReactRe.stringToElement "Table") </a> </li>
          <li key="settings">
            <a href="/ui/settings"> (ReactRe.stringToElement "Settings") </a>
          </li>
          <li key="about"> <a href="/ui/about"> (ReactRe.stringToElement "About") </a> </li>
        </ul>
      </nav>
      <div className="main-content"> <Table /> </div>
      <div className="main-growl">
        <Growl
          notifications=props.theState.notifications
          handleResponse=(
                           fun id => {
                             props.dispatch (NotificationReducer.NotificationReducer.Dismiss id);
                             ()
                           }
                         )
        />
      </div>
    </div>;
};

include ReactRe.CreateComponent Main;

let createElement ::theState ::dispatch ::children => wrapProps {theState, dispatch} ::children;
