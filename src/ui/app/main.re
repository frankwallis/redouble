external require : string => unit = "require" [@@bs.val];
require "./main.css";
require "./navbar.css";

let component = ReasonReact.statelessComponent "MainComponent";

let make ::notifications ::dispatch _children => {
  ...component,
  render: fun _self => {
    <div className="main-container">
      <nav role="navigation" className="main-navbar nav-main">
        <ul className="nav-site">
          <li key="table"> <a href="/"> (ReasonReact.stringToElement "Table") </a> </li>
          <li key="settings">
            <a href="/ui/settings"> (ReasonReact.stringToElement "Settings") </a>
          </li>
          <li key="about"> <a href="/ui/about"> (ReasonReact.stringToElement "About") </a> </li>
        </ul>
      </nav>
      <div className="main-content"> <Table hands=(Card.deal Seat.North) /> </div>
      <div className="main-growl">
        <Growl
          notifications=notifications
          handleResponse=(
                           fun id =>
                             dispatch (NotificationReducer.NotificationReducer.Dismiss id)
                         )
        />
        <button
          onClick=(
                    fun _ =>
                      dispatch (
                        NotificationReducer.NotificationReducer.Create "info" "hello" "hello there"
                      )
                  )>
          (ReasonReact.stringToElement "Add Notification")
        </button>
      </div>
    </div>;
  }
};