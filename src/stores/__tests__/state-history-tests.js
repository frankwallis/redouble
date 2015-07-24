import {StateHistory} from '../state-history';

describe('State History', () => {
	let history = null;

	beforeEach(() => {
		history = new StateHistory();
	});

	describe('push/current', () => {
		it('adds a state', () => {
			history = history.push(1);
			expect(history.current()).toEqual(1);
			history = history.push(2);
			expect(history.current()).toEqual(2);
		});

		it('clears forward history', () => {
			history = history.push(1);
			expect(history.current()).toEqual(1);
			history = history.push(2);
			expect(history.current()).toEqual(2);
			history = history.back();
			history = history.push(3);
			expect(history.current()).toEqual(3);
			history = history.back();
			expect(history.current()).toEqual(1);
		});
	});

	describe('back', () => {
		it('moves back to previous state', () => {
			history = history.push(1);
			history = history.push(2);
			history = history.back();
			expect(history.current()).toEqual(1);
		});
	});

	describe('canBack', () => {
		it('only allowed when history has cached states', () => {
			expect(history.canBack()).toBeFalsy();
			history = history.push(1);
			expect(history.canBack()).toBeFalsy();
			history = history.push(2);
			expect(history.canBack()).toBeTruthy();
			history = history.back();
			expect(history.canBack()).toBeFalsy();
		});
	});

	describe('forward', () => {
		it('moves forward to previously created state', () => {
			history = history.push(1);
			history = history.push(2);
			history = history.push(3);
			history = history.back();
			history = history.back();
			expect(history.current()).toEqual(1);
			history = history.forward();
			expect(history.current()).toEqual(2);
		});
	});

	describe('canForward', () => {
		it('only allowed when history and is not at final state', () => {
			expect(history.canForward()).toBeFalsy();
			history = history.push(1);
			history = history.push(2);
			expect(history.canForward()).toBeFalsy();
			history = history.back();
			expect(history.canForward()).toBeTruthy();
			history = history.forward();
			expect(history.canForward()).toBeFalsy();
		});
	});

	describe('jumpBack', () => {
		it('moves to start of play when play has started', () => {
			// jumps from odd to even and even to odd.
			let comparer = (state1, state2) => {
				return ((state1 % 2) !== (state2 % 2));
			};

			history = history
				.push(1)
				.push(2)
				.push(2);

			history = history.jumpBack(comparer);
			expect(history.current()).toBe(1);

			history = history
				.push(1)
				.push(3)
				.push(2);

			history = history.jumpBack(comparer);
			expect(history.current()).toBe(3);
		});
	});

	describe('canJumpBack', () => {
		it('only allowed when game has cached states', () => {
			expect(history.canJumpBack()).toBeFalsy();
			history = history.push(1);
			expect(history.canJumpBack()).toBeFalsy();
			history = history.push(2);
			expect(history.canJumpBack()).toBeTruthy();
			history = history.back();
			expect(history.canJumpBack()).toBeFalsy();
		});
	});
});
