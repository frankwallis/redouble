open Jest;

describe "BiddingBox" (fun () => {
  open Expect;

  test "displays the right number of buttons" (fun () => {
    let wrapper = Enzyme.shallow <BiddingBox makeBid=(fun _ => ()) />;

    let length = wrapper
      |> Enzyme.find "button"
      |> Enzyme.length;
    expect (length) |> toBe 38;
  });

  /*test "makes a bid when a button is clicked" (fun () => {
    let wrapper = Enzyme.shallow <BiddingBox makeBid=(fun _ => {}) />;

    let text = wrapper
      |> Enzyme.find "thead tr th"
      |> Enzyme.first
      |> Enzyme.text;
    expect (text) |> toBe "east";
  });*/
});
