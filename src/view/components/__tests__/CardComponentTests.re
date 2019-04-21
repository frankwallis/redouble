open Jest;

describe("CardComponent", () => {
  open Expect;
  open Card;

  Enzyme.configureEnzyme(Enzyme.react_16_adapter()) |> ignore;

  test("displays the pip for aces", () => {
    let wrapper = Enzyme.shallow(<CardComponent card=((Pip.Ace, Suit.Spades)) />);
    let text = wrapper
      |> Enzyme.Shallow.find(".card-pip")
      |> Enzyme.Shallow.text;
    expect (text) |> toBe("A");
  });

  test("displays the pip for plain cards", () => {
    let wrapper = Enzyme.shallow(<CardComponent card=((Pip.Eight, Suit.Hearts)) />);
    let text = wrapper
      |> Enzyme.Shallow.find(".card-pip")
      |> Enzyme.Shallow.text;
    expect (text) |> toBe("8");
  });

  test("displays the suit", () => {
    let wrapper = Enzyme.shallow(<CardComponent card=((Pip.Eight, Suit.Hearts)) />);
    let hasClass = wrapper
      |> Enzyme.Shallow.find(".card-suit")
      |> Enzyme.Shallow.first
      |> Enzyme.Shallow.hasClass("suit-hearts");
    expect (hasClass) |> toBe(true);
  });
});