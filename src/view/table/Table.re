NodeUtils.require("./Table.css");

[@react.component]
let make =
    (
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
  let biddingHasEnded = Board.biddingHasEnded(board);
  let players =
    Seat.all
    |> List.map(
          (seat) =>
            <section className=("table-edge-" ++ Seat.name(seat)) key=(Seat.name(seat))>
              <header className="table-player-name">
                (ReasonReact.string(Seat.name(seat)))
              </header>
              <div className=("table-hand-" ++ Seat.name(seat))>
                <Hand cards=(Card.SeatMap.find(seat, Board.remainingHands(board))) playCard />
              </div>
            </section>
        );
  <div className="bridge-table">
    <div className="table-controls">
      <ControlBar
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
      (biddingHasEnded ? <TrickScore board /> : ReasonReact.null)
    </div>
    <div className="table-players"> (ReasonReact.array(Array.of_list(players))) </div>
    <div className="table-board">
      (biddingHasEnded ? <Trick board /> : <BiddingHistory board />)
    </div>
    <div className="table-bidding-box">
      (biddingHasEnded ? ReasonReact.null : <BiddingBox makeBid />)
    </div>
  </div>
};
