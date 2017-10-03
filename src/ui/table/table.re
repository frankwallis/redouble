open Board;

NodeUtils.require "ui/table/table.css";

let component = ReasonReact.statelessComponent "Table";

let make
  ::board ::makeBid ::playCard
  ::pause ::canPause ::resume ::canResume ::back ::canBack ::forward ::canForward ::jumpBack ::canJumpBack
  _children => {
  ...component,
  render: fun _self => {
    let biddingHasEnded = Board.biddingHasEnded board;

    let players = Seat.all
      |> List.map (fun seat =>
          <section className=("table-edge-" ^ Seat.name seat) key=(Seat.name seat)>
            <header className="table-player-name">
              (ReasonReact.stringToElement (Seat.name seat))
            </header>
            <div className=("table-hand-" ^ Seat.name seat)>
              <Hand cards=(Card.SeatMap.find seat (Board.remainingHands board)) playCard />
            </div>
          </section>
        );
    <div className="bridge-table">
      <div className="table-controls">
        <ControlBar pause canPause resume canResume back canBack forward canForward jumpBack canJumpBack />
      </div>
      <div className="table-players">
        (ReasonReact.arrayToElement (Array.of_list players))
      </div>
      <div className="table-board">
        (biddingHasEnded ? <Trick board /> : <BiddingHistory board />)
      </div>
      <div className="table-bidding-box">
        (biddingHasEnded ? ReasonReact.nullElement : <BiddingBox makeBid />)
      </div>
    </div>
  }
};