open Jest;

describe "BiddingHistory" (fun () => {
  open Expect;
  open Bid;

  test "displays the headings" (fun () => {
    let board = Board.create Seat.East;
    let wrapper = Enzyme.shallow <BiddingHistory board=board />;

    let length = wrapper
      |> Enzyme.find "thead tr th"
      |> Enzyme.length;
    expect (length) |> toBe 4;
  });

  test "displays the dealer on the left hand side" (fun () => {
    let board = Board.create Seat.East;
    let wrapper = Enzyme.shallow <BiddingHistory board=board />;

    let text = wrapper
      |> Enzyme.find "thead tr th"
      |> Enzyme.first
      |> Enzyme.text;
    expect (text) |> toBe "east";
  });

  test "displays the bids" (fun () => {
    let board = Board.create Seat.East
      |> Board.makeBid (Call 1 BidSuit.Clubs)
      |> Board.makeBid (Call 2 BidSuit.Diamonds);

    let wrapper = Enzyme.shallow <BiddingHistory board=board />;

    let cellLength = wrapper
      |> Enzyme.find "tbody tr td"
      |> Enzyme.length;
    expect (cellLength) |> toBe 4;

    let bidLength = wrapper
      |> Enzyme.find "tbody tr BidComponent"
      |> Enzyme.length;
    expect (bidLength) |> toBe 2;
  });

  test "displays an empty row when there are no bids" (fun () => {
    let board = Board.create Seat.East;
    let wrapper = Enzyme.shallow <BiddingHistory board=board />;

    let length = wrapper
      |> Enzyme.find "tbody tr td"
      |> Enzyme.length;
    expect (length) |> toBe 4;
  });

  test "displays an empty row when there are 4 bids" (fun () => {
    let board = Board.create Seat.East
      |> Board.makeBid (Call 1 BidSuit.Clubs)
      |> Board.makeBid (Call 1 BidSuit.Diamonds)
      |> Board.makeBid (Call 1 BidSuit.Hearts)
      |> Board.makeBid (Call 2 BidSuit.Spades);

    let wrapper = Enzyme.shallow <BiddingHistory board=board />;

    let length = wrapper
      |> Enzyme.find "tbody tr"
      |> Enzyme.length;
    expect (length) |> toBe 2;
  });
});
