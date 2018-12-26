open Jest;

describe("BiddingHistory", () => {
  open Expect;
  open Bid;

  Enzyme.configureEnzyme(Enzyme.react_16_adapter()) |> ignore;

  test("displays the headings", () => {
    let board = Board.create(Seat.East);
    let wrapper = Enzyme.shallow(<BiddingHistory board />);

    let length = wrapper
      |> Enzyme.Shallow.find("thead tr th")
      |> Enzyme.Shallow.length;
    expect (length) |> toBe(4);
  });

  test("displays the dealer on the left hand side", () => {
    let board = Board.create(Seat.East);
    let wrapper = Enzyme.shallow(<BiddingHistory board />);

    let text = wrapper
      |> Enzyme.Shallow.find("thead tr th")
      |> Enzyme.Shallow.first
      |> Enzyme.Shallow.text;
    expect (text) |> toBe("east");
  });

  test("displays the bidding cells for all seats", () => {
    let board = Board.create(Seat.East)
      |> Board.makeBid (Call(1, BidSuit.Clubs))
      |> Board.makeBid (Call(2, BidSuit.Diamonds));

    let wrapper = Enzyme.shallow(<BiddingHistory board />);

    let cellLength = wrapper
      |> Enzyme.Shallow.find("tbody tr td")
      |> Enzyme.Shallow.length;
    expect (cellLength) |> toBe(4);
  });

  test("displays the bids", () => {
    let board = Board.create(Seat.East)
      |> Board.makeBid (Call(1, BidSuit.Clubs))
      |> Board.makeBid (Call(2, BidSuit.Diamonds));

    let wrapper = Enzyme.shallow(<BiddingHistory board />);

    let bidLength = wrapper
      |> Enzyme.Shallow.find("tbody tr BidComponent")
      |> Enzyme.Shallow.length;
    expect (bidLength) |> toBe(2);
  });

  test("displays an empty row when there are no bids", () => {
    let board = Board.create(Seat.East);
    let wrapper = Enzyme.shallow(<BiddingHistory board />);

    let length = wrapper
      |> Enzyme.Shallow.find("tbody tr td")
      |> Enzyme.Shallow.length;
    expect (length) |> toBe(4);
  });

  test("displays an empty row when there are 4 bids", () => {
    let board = Board.create(Seat.East)
      |> Board.makeBid (Call(1, BidSuit.Clubs))
      |> Board.makeBid (Call(1, BidSuit.Diamonds))
      |> Board.makeBid (Call(1, BidSuit.Hearts))
      |> Board.makeBid (Call(2, BidSuit.Spades));

    let wrapper = Enzyme.shallow(<BiddingHistory board />);

    let length = wrapper
      |> Enzyme.Shallow.find("tbody tr")
      |> Enzyme.Shallow.length;
    expect (length) |> toBe(2);
  });
});
