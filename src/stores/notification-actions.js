
import {NOTIFY_CREATE, NOTIFY_DISMISS} from "./action-types";

let currentId = 1;

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

export function notify(opts) {
	let notification = {};
	notification.id = currentId ++;
	notification.timestamp = new Date();
	notification.source = opts.source;
	notification.type = opts.type;
	notification.title = opts.title;
	notification.timeout = opts.timeout || 20000;
	notification.message = opts.message;
	notification.buttons = opts.buttons || [];
	notification.defaultButton = opts.defaultButton;

	let type = NOTIFY_CREATE;
	return { type, notification };
}

export function dismissNotification(id) {
	let type = NOTIFY_DISMISS;
	return { type, id };
}
