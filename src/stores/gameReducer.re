type state = {
  history: list Board.t,
  position: int,
  autoPlay: bool,
  autoPlaySequence: int
};
type action =
  | Push Board.t
  | Back
  | Forward
  | Pause
  | Resume;
let initialState () => {
  history: [],
  position: -1,
  autoPlay: false,
  autoPlaySequence: 0
};
let reducer state action =>
  switch action {
  | Push game => {...state, history: [game, ...state.history], position: state.position +1 }
  | Back => {...state, position: state.position > 0 ? state.position -1 : state.position }
  | Forward => {...state, position: position < (List.length state.history) -1 ? state.position +1 : state.position }
  | Pause => {...state, autoPlay: false, autoPlaySequence: state.autoPlaySequence +1 }
  | Resume => {...state, autoPlay: true, autoPlaySequence: state.autoPlaySequence +1 }
  };