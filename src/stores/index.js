import gameReducer from "./game-reducer";
import playerReducer from "./player-reducer";
import notificationReducer from "./notification-reducer";

export default {
	gameStore: gameReducer,
	notificationStore: notificationReducer,
	playerStore: playerReducer
};
