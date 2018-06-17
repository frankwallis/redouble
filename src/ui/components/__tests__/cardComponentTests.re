open Jest;

describe("CardComponent", () => {
  open Expect;

  test("displays the pip for aces", () => {
    let wrapper = Enzyme.shallow(<CardComponent card=((Ace, Spades)) />);
    let text = wrapper
      |> Enzyme.find(".card-pip")
      |> Enzyme.text;
    expect (text) |> toBe("A");
  });

  test("displays the pip for plain cards", () => {
    let wrapper = Enzyme.shallow(<CardComponent card=((Eight, Hearts)) />);
    let text = wrapper
      |> Enzyme.find(".card-pip")
      |> Enzyme.text;
    expect (text) |> toBe("8");
  });

  test("displays the suit", () => {
    let wrapper = Enzyme.shallow(<CardComponent card=((Eight, Hearts)) />);
    let hasClass = wrapper
      |> Enzyme.find(".card-suit")
      |> Enzyme.first
      |> Enzyme.hasClass("suit-hearts");
    expect (hasClass) |> toBe(true);
  });
});