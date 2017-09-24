open Board;

external require : string => unit = "require" [@@bs.val];
require "ui/table/table.css";

let component = ReasonReact.statelessComponent "Table";

let make ::board ::makeBid ::playCard _children => {
  ...component,
  render: fun _self => {
    let players =
      Seat.all |>
      List.map (
        fun seat =>
          <section className=("table-edge-" ^ Seat.name seat) key=(Seat.name seat)>
            <header className="table-player-name">
              (ReasonReact.stringToElement (Seat.name seat))
            </header>
            <div className=("table-hand-" ^ Seat.name seat)>
              <Hand cards=(Card.SeatMap.find seat board.hands) playCard />
            </div>
          </section>
      );
    <div className="bridge-table">
      <div className="table-controls" />
      <div className="table-players"> (ReasonReact.arrayToElement (Array.of_list players)) </div>
      <div className="table-board">
        <BiddingHistory board />
      </div>
      <div className="table-bidding-box"> <BiddingBox makeBid /> </div>
    </div>
  }
};