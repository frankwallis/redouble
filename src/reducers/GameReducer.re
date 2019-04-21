type state = {
  history: list(Board.t),
  position: int,
  autoPlay: bool,
  sequenceNo: int
};

type action =
  | NewBoard(Seat.t)
  | Push(Board.t)
  | Back
  | JumpBack
  | Forward
  | Pause
  | Resume;

let initialState = {
  history: [Board.create(Seat.South)],
  position: 0,
  autoPlay: true,
  sequenceNo: 0
};

let reducer = (state, action) =>
  switch action {
  | NewBoard(dealer) => {
      ...state,
      history: [Board.create(dealer)],
      position: 0,
      sequenceNo: state.sequenceNo + 1
    }
  | Push(game) => {
      ...state,
      history: [game, ...state.history],
      position: 0,
      sequenceNo: state.sequenceNo + 1
    }
  | Back => {
      ...state,
      position:
        state.position < List.length(state.history) - 1 ? state.position + 1 : state.position,
      autoPlay: false,
      sequenceNo: state.sequenceNo + 1
    }
  | JumpBack => {
      ...state,
      position:
        state.position < List.length(state.history) - 1 ? state.position + 1 : state.position,
      autoPlay: false,
      sequenceNo: state.sequenceNo + 1
    }
  | Forward => {
      ...state,
      position: state.position > 0 ? state.position - 1 : state.position,
      autoPlay: false,
      sequenceNo: state.sequenceNo + 1
    }
  | Pause => {...state, autoPlay: false, sequenceNo: state.sequenceNo + 1}
  | Resume => {...state, autoPlay: true, sequenceNo: state.sequenceNo + 1}
  };

/* Selectors */
let currentBoard = (state) => List.nth(state.history, state.position);

let canPause = (state) => state.autoPlay;

let canResume = (state) => ! state.autoPlay;

let canBack = (state) => state.position + 1 < List.length(state.history);

let canForward = (state) => state.position > 0;

let canJumpBack = (state) => state.position + 1 < List.length(state.history);
