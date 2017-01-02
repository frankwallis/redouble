
import {PLAYER_UPDATE} from "./action-types";

export function updatePlayer(seat, delta) {
	let type = PLAYER_UPDATE;
	return { type, seat, delta };
}
