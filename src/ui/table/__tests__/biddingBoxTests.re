open Jest;

describe("BiddingBox", () => {
  open Expect;

  test("displays the right number of buttons", () => {
    let wrapper = Enzyme.shallow(<BiddingBox makeBid=(_ => ()) />);

    let length = wrapper
      |> Enzyme.find("button")
      |> Enzyme.length;
    expect (length) |> toBe(38);
  });

  /* test "makes a bid when a button is clicked" (fun () => {
    let makeBidSpy = MockJs.fn ();
    let wrapper = Enzyme.shallow <BiddingBox makeBid=(makeBidSpy) />;

    let button = wrapper
      |> Enzyme.find "button"
      |> Enzyme.first;

    Enzyme.simulate(button, "click");
    expect (makeBidSpy.mock.calls.length) |> toBe 1;
  });*/
});