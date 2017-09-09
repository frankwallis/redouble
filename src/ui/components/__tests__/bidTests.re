open Jest;

/*
	it('displays no trumps', () => {
		let bid = { type: BidType.Call, suit: BidSuit.NoTumps, level: 3 };
		let bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
		//
		let bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
		expect(bidtext.textContent).to.equal("3");
	});

	it('displays no bid', () => {
		let bid = { type: BidType.NoBid };
		let bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
		//
		let bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
		expect(bidtext.textContent).to.equal("No Bid");
	});

	it('displays double', () => {
		let bid = { type: BidType.Double };
		let bidComponent = TestUtils.renderIntoDocument(<BidComponent bid={bid}/>);
		//
		let bidtext = TestUtils.findRenderedDOMComponentWithClass(bidComponent, 'bid-container');
		expect(bidtext.textContent).to.equal("Double");
	});
*/

describe "BidComponent" (fun () => {
  open Expect;

  test "displays call" (fun () => {
    let wrapper = Enzyme.shallow <BidComponent bid=(Call 3 Hearts) />;
    let text = wrapper
      |> Enzyme.find ".bid-container"
      |> Enzyme.text;
    expect (text) |> toBe "3";
  });

  test "displays no bid" (fun () => {
    let wrapper = Enzyme.shallow <BidComponent bid=NoBid />;
    let text = wrapper
      |> Enzyme.find ".bid-container"
      |> Enzyme.text;
  expect (text) |> toBe "No Bid";
  });

  test "displays double" (fun () => {
    let wrapper = Enzyme.shallow <BidComponent bid=Double />;
    let text = wrapper
      |> Enzyme.find ".bid-container"
      |> Enzyme.text;
    expect (text) |> toBe "Double";
  });
});