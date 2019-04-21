open Jest;

describe("BiddingBox", () => {
  open Expect;

  Enzyme.configureEnzyme(Enzyme.react_16_adapter()) |> ignore;

  test("displays the right number of buttons", () => {
    let wrapper = Enzyme.shallow(<BiddingBox makeBid=(_ => ()) />);

    let length = wrapper
      |> Enzyme.Shallow.find("button")
      |> Enzyme.Shallow.length;
    expect (length) |> toBe(38);
  });

  /* test "makes a bid when a button is clicked" (fun () => {
    let makeBidSpy = MockJs.fn ();
    let wrapper = Enzyme.shallow <BiddingBox makeBid=(makeBidSpy) />;

    let button = wrapper
      |> Enzyme.Shallow.find "button"
      |> Enzyme.first;

    Enzyme.simulate(button, "click");
    expect (makeBidSpy.mock.calls.length) |> toBe 1;
  });*/
});