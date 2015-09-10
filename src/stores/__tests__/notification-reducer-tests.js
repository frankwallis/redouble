import notificationReducer from '../notification-reducer';
import * as actionTypes from '../action-types';

describe('Notification Reducer', () => {
	let initialState;

	beforeEach(() => {
		initialState = [
			{id: 1, message: "hello", buttons: ["ok"]},
			{id: 2, message: "goodbye", buttons: ["ok"]}
		];
	});

	describe('NOTIFY_CREATE', () => {
		let state;

		beforeEach(() => {
			state = notificationReducer(initialState, {
				type: actionTypes.NOTIFY_CREATE,
				notification: {
					id: 3,
					message: "wotcha",
					buttons: []
				}
			});
		});

		it('adds the new notification', () => {
			expect(state.length).to.equal(3);
		});
	});

	describe('NOTIFY_DISMISS', () => {
		let state;

		beforeEach(() => {
			state = notificationReducer(initialState, {
				type: actionTypes.NOTIFY_DISMISS,
				id: 1
			});
		});

		it('removes the notification with the correct id', () => {
			expect(state.length).to.equal(initialState.length - 1);
			expect(state[0].id).to.equal(2);
		});
	});
});
