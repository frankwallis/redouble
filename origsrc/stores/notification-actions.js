
import {NOTIFY_CREATE, NOTIFY_DISMISS} from "./action-types";

let currentId = 1;

export function dismissNotification(id) {
	let type = NOTIFY_DISMISS;
	return { type, id };
}

export function notify(opts) {
	let notification = {};
	notification.id = currentId ++;
	notification.timestamp = new Date();
	notification.source = opts.source;
	notification.type = opts.type;
	notification.title = opts.title;
	notification.message = opts.message;
	notification.timeout = opts.timeout || 5000;
	notification.buttons = opts.buttons || [];
	notification.defaultButton = opts.defaultButton;

	return (dispatch) => {
		dispatch({ type: NOTIFY_CREATE, notification });

		if (notification.timeout) {
			setTimeout(() => dispatch(dismissNotification(notification.id)),
				notification.timeout);
		}
	};
}

export function notifyInfo(opts) {
	opts = opts || {};
	opts.type = 'info';
	return notify(opts);
}

export function notifyWarn(opts) {
	opts = opts || {};
	opts.type = 'warn';
	return notify(opts);
}

export function notifyError(opts) {
	opts = opts || {};
	opts.type = 'error';
	return notify(opts);
}

export function notifySuccess(opts) {
	opts = opts || {};
	opts.type = 'success';
	return notify(opts);
}

export function notifyQuestion(opts) {
	opts = opts || {};
	opts.type = 'question';
	return notify(opts);
}
