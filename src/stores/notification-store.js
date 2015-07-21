import {NOTIFY_CREATE, NOTIFY_DISMISS} from "./action-types";

let initialState = [];

export default function notificationStore(state = initialState, action) {
	switch (action.type) {
		case NOTIFY_CREATE:
			return state.concat(action.notification);
		case NOTIFY_DISMISS:
			let notification = state.filter(notif => notif.id === action.id)[0];

			if (notification)
				notification.response = action.response;

			console.log('filtering on ' + action.id);
			return state.filter(notif => notif.id !== action.id);
		default:
			return state;
	}
}
