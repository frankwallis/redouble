type state = {
  history: list Board.t,
  sequence: int,
  autoPlay: bool
};
type action =
  | Push Board.t
  | Back
  | Forward
  | Pause
  | Resume;
let initialState () => {
  history: [],
  sequence: -1,
  autoPlay: false
};
let reducer action state =>
  switch action {
  | Push game => {...state, history: [game, ...state.history] }
  | Back => {...state, sequence: state.sequence -1 }
  | Forward => {...state, sequence: state.sequence +1 }
  | Pause => {...state, autoPlay: false }
  | Resume => {...state, autoPlay: true }
  };