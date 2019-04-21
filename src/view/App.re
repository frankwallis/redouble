[@react.component]
let make = () => {

  let (gameState, gameDispatch) = React.useReducer(GameReducer.reducer, GameReducer.initialState);
  let (notifState, notifDispatch) = React.useReducer(NotificationReducer.reducer, NotificationReducer.initialState);

  let board = GameReducer.currentBoard(gameState);
  let makeBid = (bid) => {
    let newBoard = Board.makeBid(bid, board)
    gameDispatch(GameReducer.Push(newBoard));
  }
  let playCard = (card) => {
    let newBoard = Board.playCard(card, board)
    gameDispatch(GameReducer.Push(newBoard));
  }

  React.useEffect0(() => {
    gameDispatch(GameReducer.NewBoard(Seat.North));
    None;
  });

  React.useEffect1(() => GameEffects.autoPlay(gameState, makeBid, playCard), [| gameState |]);

  let busy = NotificationReducer.isBusy(notifState);
  let notifications = notifState.items;
  let dismiss = (id) => notifDispatch(NotificationReducer.Dismiss(id));
  let pause = () => gameDispatch(GameReducer.Pause);
  let canPause = GameReducer.canPause(gameState);
  let resume = () => gameDispatch(GameReducer.Resume);
  let canResume = GameReducer.canResume(gameState);
  let back = () => gameDispatch(GameReducer.Back);
  let canBack = GameReducer.canBack(gameState);
  let forward = () => gameDispatch(GameReducer.Forward);
  let canForward = GameReducer.canForward(gameState);
  let jumpBack = () => gameDispatch(GameReducer.JumpBack);
  let canJumpBack = GameReducer.canJumpBack(gameState);

  <Main
    busy
    notifications
    dismiss
    board
    makeBid
    playCard
    pause
    canPause
    resume
    canResume
    back
    canBack
    forward
    canForward
    jumpBack
    canJumpBack
  />
};
