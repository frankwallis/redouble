type state = {
  history: list Board.t,
  position: int,
  autoPlay: bool,
  autoPlaySequence: int
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
  autoPlaySequence: 0
};
let reducer state action =>
  switch action {
  | NewBoard dealer => {...state, history: [Board.create dealer], position: 0 }
  | Push game => {...state, history: [game, ...state.history], position: 0 }
  | Back => {...state, position: state.position < (List.length state.history) -1 ? state.position +1 : state.position }
  | Forward => {...state, position: state.position > 0 ? state.position -1 : state.position }
  | Pause => {...state, autoPlay: false, autoPlaySequence: state.autoPlaySequence +1 }
  | Resume => {...state, autoPlay: true, autoPlaySequence: state.autoPlaySequence +1 }
  };