NodeUtils.require("./main.css");

NodeUtils.require("./navbar.css");

[@react.component]
let make =
    (
      ~busy,
      ~notifications,
      ~dismiss,
      ~board,
      ~makeBid,
      ~playCard,
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
  <div className="main-container">
    <nav role="navigation" className="main-navbar nav-main">
      <ul className="nav-site">
        <li key="table"> <a href="/"> (ReasonReact.string("Table")) </a> </li>
        <li key="settings">
          <a href="/ui/settings"> (ReasonReact.string("Settings")) </a>
        </li>
        <li key="about"> <a href="/ui/about"> (ReasonReact.string("About")) </a> </li>
      </ul>
    </nav>
    <div className="main-content">
      <Table
        board
        makeBid
        playCard
        pause
        canPause
        resume
        canResume
        back
        canBack
        forward
        canForward
        jumpBack
        canJumpBack
      />
    </div>
    <div className="main-growl"> <Growl notifications dismiss /> </div>
    <div className="main-spinner"> (busy ? <Spinner /> : ReasonReact.null) </div>
  </div>
};