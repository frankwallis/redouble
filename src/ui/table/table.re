external require : string => unit = "require" [@@bs.val];
require "ui/table/table.css";

let component = ReasonReact.statelessComponent "TableComponent";

let make ::hands _children => {
  ...component,
  render: fun _self => {
    let playCard _card => ();
    let makeBid _bid => ();
    let players =
      Seat.all |>
      List.map (
        fun seat =>
          <section className=("table-edge-" ^ Seat.name seat) key=(Seat.name seat)>
            <header className="table-player-name">
              (ReasonReact.stringToElement (Seat.name seat))
            </header>
            <div className=("table-hand-" ^ Seat.name seat)>
              <Hand cards=(Card.SeatMap.find seat hands) playCard />
            </div>
          </section>
      );
    <div className="bridge-table">
      <div className="table-controls" />
      <div className="table-players"> (ReasonReact.arrayToElement (Array.of_list players)) </div>
      <div className="table-board" />
      <div className="table-bidding-box"> <BiddingBox makeBid /> </div>
    </div>
  }
};