include Card;

external require : string => unit = "require" [@@bs.val];
require ("ui/table/table.css");

module Table = {
  include ReactRe.Component.Stateful;
  let name = "Table";
  type props = unit;

  type state = {hands: SeatMap.t (list Card.t)};
  let getInitialState props => {hands: Card.deal Seat.North};

  let playCard (card) => ();
  let makeBid (bid) => ();

  let render {props, state} => {
		let players = Seat.all |> List.map (fun seat => {
      <section className=("table-edge-" ^ (Seat.name seat)) key=(Seat.name seat)>
        <header className="table-player-name">(ReactRe.stringToElement (Seat.name seat))</header>
        <div className=("table-hand-" ^ (Seat.name seat))>
          <Hand cards=(SeatMap.find seat state.hands) playCard />
        </div>
      </section>
		});

    <div className="bridge-table">
      <div className="table-controls">
      </div>
      <div className="table-players">
        (ReactRe.arrayToElement(Array.of_list players))
      </div>
      <div className="table-board">
      </div>
      <div className="table-bidding-box">
        <BiddingBox makeBid />
      </div>
    </div>;
  };
};

include ReactRe.CreateComponent Table;
let createElement ::children => wrapProps () ::children;
