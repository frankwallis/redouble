external require : string => unit = "require" [@@bs.val];
require ("./main.css");
require ("./navbar.css");

module Main = {
  include ReactRe.Component.Stateful;
  type props = unit;
  type state = {clicks: int};
  let name = "Main";
  let getInitialState props => {clicks: 0};
  let render {state, updater} =>
    <div className="main-container">
		  <nav role="navigation" className="main-navbar nav-main">
		    <ul className="nav-site">
		      <li key="table">
				    <a href="/">(ReactRe.stringToElement ("Table"))</a>
			    </li>
			    <li key="settings">
			      <a href="/ui/settings">(ReactRe.stringToElement ("Settings"))</a>
			    </li>
			    <li key="about">
			      <a href="/ui/about">(ReactRe.stringToElement ("About"))</a>
  			  </li>
		    </ul>
		  </nav>
		  <div className="main-content">
		    (ReactRe.stringToElement ("Content"))
		  </div>
		  <div className="main-growl">
        <Growl notifications=[] handleResponse=(fun _ => ()) />
		  </div>
	  </div>;
};

include ReactRe.CreateComponent Main;

let createElement ::children => wrapProps () ::children;
