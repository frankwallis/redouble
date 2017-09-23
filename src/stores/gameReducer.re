type state = {
  history: list Board.t,
  position: int,
  autoPlay: bool,
  sequenceNo: int
};
type action =
  | NewBoard Seat.t
  | Push Board.t
  | Back
  | Forward
  | Pause
  | Resume;
let initialState = {
  history: [Board.create Seat.South],
  position: 0,
  autoPlay: false,
  sequenceNo: 0
};
let reducer state action =>
  switch action {
  | NewBoard dealer => {...state, history: [Board.create dealer], position: 0, sequenceNo: state.sequenceNo +1 }
  | Push game => {...state, history: [game, ...state.history], position: 0, sequenceNo: state.sequenceNo +1 }
  | Back => {...state, position: state.position < (List.length state.history) -1 ? state.position +1 : state.position, autoPlay: false, sequenceNo: state.sequenceNo +1 }
  | Forward => {...state, position: state.position > 0 ? state.position -1 : state.position, autoPlay: false, sequenceNo: state.sequenceNo +1 }
  | Pause => {...state, autoPlay: false, sequenceNo: state.sequenceNo +1 }
  | Resume => {...state, autoPlay: true, sequenceNo: state.sequenceNo +1 }
  };