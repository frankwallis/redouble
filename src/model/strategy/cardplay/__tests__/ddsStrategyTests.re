open Jest;
open Expect;

let rec playAll board => {
  Js.Promise.(
    if (Board.playHasEnded board) {
      board |> resolve
    }
    else {
      DdsStrategy.getCard board
        |> then_ (fun card => {
          switch (Board.validateCard card board) {
          | Some message => reject message
          | None => playAll (Board.playCard card board)
          }
        });
    }
  )
};

describe "DdsStrategy" (fun () => {
  open Bid;
  open Card;

  describe "getCard" (fun () => {
    testPromise "observes current trick" (fun () => {
      let board = Board.fromPBN "N: KQ63.A72.764.T92 J52.JT9.J2.AQ743 84.865.QT85.KJ86 AT97.KQ43.AK93.5"
        |> Board.makeBids [NoBid, NoBid, Call 1 BidSuit.Hearts, Call 2 BidSuit.Spades, NoBid, NoBid, NoBid]
        |> Board.playCard (Pip.King, Suit.Spades);

      Js.Promise.(
        DdsStrategy.getCard board
          |> then_ (fun card => expect card |> toEqual (Pip.Two, Suit.Spades) |> resolve)
      )
    });

    testPromise "unblocks in 3 card ending" (fun () => {
      let board = Board.fromPBN "W:456... 2...A2 7...76 A.A..3"
        |> Board.makeBids [NoBid, NoBid, NoBid, Call 1 BidSuit.NoTrumps, NoBid, NoBid, NoBid];

      Js.Promise.(
        playAll board
          |> then_ (fun board => expect (Board.declarerTricks board) |> toEqual 3 |> resolve)
      )
    });

    testPromise "Bond beats Drax" (fun () => {
      let board = Board.fromPBN "N:..Q8765432.AQT84 65432.T9872.JT9. T987.6543..76532 AKQJ.AKQJ.AK.KJ9"
        |> Board.makeBids [Call 7 BidSuit.Clubs, NoBid, NoBid, Double, Redouble, NoBid, NoBid, NoBid];

      Js.Promise.(
        playAll board
          |> then_ (fun board => expect (Board.declarerTricks board) |> toEqual 13 |> resolve)
      )
    });

    testPromise "Solves the PotBoiler" (fun () => {
      let board = Board.fromPBN "W:KJT86.5432..KQJT AQ7.AKQJ.QJT987. 95432..65432.432 .T9876.AK.A98765"
        |> Board.makeBids [NoBid, NoBid, NoBid, Call 7 BidSuit.Hearts, NoBid, NoBid, NoBid]
        |> Board.playCard (Pip.King, Suit.Clubs);

      Js.Promise.(
        playAll board
          |> then_ (fun board => expect (Board.declarerTricks board) |> toEqual 13 |> resolve)
      )
    });
  });
});