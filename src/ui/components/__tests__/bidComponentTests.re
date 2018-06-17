open Jest;

describe("BidComponent", () => {
  open Expect;

  test("displays call", () => {
    let wrapper = Enzyme.shallow(<BidComponent bid=Call(3, Hearts) />);
    let text = wrapper
      |> Enzyme.find(".bid-container")
      |> Enzyme.text;
    expect (text) |> toBe("3");
  });

  test("displays no bid", () => {
    let wrapper = Enzyme.shallow(<BidComponent bid=NoBid />);
    let text = wrapper
      |> Enzyme.find(".bid-container")
      |> Enzyme.text;
    expect (text) |> toBe("No Bid");
  });

  test("displays double", () => {
    let wrapper = Enzyme.shallow(<BidComponent bid=Double />);
    let text = wrapper
      |> Enzyme.find(".bid-container")
      |> Enzyme.text;
    expect (text) |> toBe("Double");
  });
});