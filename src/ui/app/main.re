NodeUtils.require "./main.css";
NodeUtils.require "./navbar.css";

let component = ReasonReact.statelessComponent "Main";

let make
  ::notifications ::dismiss ::board ::makeBid ::playCard
  ::pause ::canPause ::resume ::canResume ::back ::canBack ::forward ::canForward ::jumpBack ::canJumpBack
  _children => {
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
      <div className="main-content">
        <Table board makeBid playCard pause canPause resume canResume back canBack forward canForward jumpBack canJumpBack />
      </div>
      <div className="main-growl">
        <Growl notifications dismiss />
      </div>
    </div>
  }
};