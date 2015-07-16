jest.dontMock('../notification-store.js');

import {NotificationStore, NotificationActions} from '../notification-store';

describe('Notification Store', () => {

	describe('notify', () => {
		it('raises notifications', () => {
			expect(NotificationStore.notifications.length).toBe(0);

			NotificationActions.notify({
				title: 'you!',
				message: 'this just happened'
			});

			jest.runAllTimers();
			expect(NotificationStore.notifications.length).toBe(1);
		});

		it('generates unique ids', () => {
			let opts = {
				title: 'you!',
				message: 'something else just happened'
			};

			/* add some notifications of each type */
			NotificationActions.notify(opts);
			NotificationActions.info(opts);
			NotificationActions.warn(opts);
			NotificationActions.question(opts);

			jest.runAllTimers();
			expect(NotificationStore.notifications.length).toBeGreaterThan(3);

			/* look for duplicates */
			NotificationStore.notifications.forEach((not1, idx1) => {
				expect(NotificationStore.notifications.some((not2, idx2) => {
					return ((idx2 > idx1) && (not1.id == not2.id));
				})).toBeFalsy();
			});
		});
	});

	describe('question', () => {
		it('gets the correct response', () => {
			let response = undefined;
			NotificationStore.notifications = [];

			let unsubscribeToken = NotificationStore.listen((notification) => {
				if (notification.source === unsubscribeToken) {
					if (notification.response) {
						unsubscribeToken();
						response = notification.response;
					}
				}
			});

			NotificationActions.question({
				message: 'are you sure you want to do that?',
				source: unsubscribeToken,
				buttons: ['yes', 'no']
			});

			jest.runAllTimers();
			expect(NotificationStore.notifications.length).toBe(1);
			expect(response).toBeUndefined();

			NotificationActions.dismiss({
				id: NotificationStore.notifications[0].id,
				response: 'yes'
			});

			jest.runAllTimers();
			expect(response).toBe('yes');
		});
	});

	describe('dismiss', () => {
		it('removes notifications', () => {
			let opts = {
				title: 'achtung',
				message: 'parking est genant',
				buttons: ['aye']
			};

			NotificationStore.notifications = [];
			NotificationActions.notify(opts);
			NotificationActions.notify(opts);
			NotificationActions.notify(opts);
			jest.runAllTimers();

			expect(NotificationStore.notifications.length).toBe(3);
			let ids = NotificationStore.notifications.map((not) => not.id);

			NotificationActions.dismiss({ id: ids[2] });
			jest.runAllTimers();
			expect(NotificationStore.notifications.length).toBe(2);
			expect(NotificationStore.notifications.some((not) => not.id == ids[2])).toBeFalsy();

			NotificationActions.dismiss({ id: ids[0] });
			jest.runAllTimers();
			expect(NotificationStore.notifications.length).toBe(1);
			expect(NotificationStore.notifications.some((not) => not.id == ids[0])).toBeFalsy();

			NotificationActions.dismiss({ id: ids[1] });
			jest.runAllTimers();
			expect(NotificationStore.notifications.length).toBe(0);
		});
	});
});
