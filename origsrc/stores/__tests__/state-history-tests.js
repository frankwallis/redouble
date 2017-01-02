import {StateHistory} from '../state-history';

describe('State History', () => {
	let history = null;

	beforeEach(() => {
		history = new StateHistory();
	});

	describe('push/current', () => {
		it('adds a state', () => {
			history = history.push(1);
			expect(history.current()).to.equal(1);
			history = history.push(2);
			expect(history.current()).to.equal(2);
		});

		it('clears forward history', () => {
			history = history.push(1);
			expect(history.current()).to.equal(1);
			history = history.push(2);
			expect(history.current()).to.equal(2);
			history = history.back();
			history = history.push(3);
			expect(history.current()).to.equal(3);
			history = history.back();
			expect(history.current()).to.equal(1);
		});
	});

	describe('back', () => {
		it('moves back to previous state', () => {
			history = history.push(1);
			history = history.push(2);
			history = history.back();
			expect(history.current()).to.equal(1);
		});
	});

	describe('canBack', () => {
		it('only allowed when history has cached states', () => {
			expect(history.canBack()).to.be.false;
			history = history.push(1);
			expect(history.canBack()).to.be.false;
			history = history.push(2);
			expect(history.canBack()).to.be.true;
			history = history.back();
			expect(history.canBack()).to.be.false;
		});
	});

	describe('forward', () => {
		it('moves forward to previously created state', () => {
			history = history.push(1);
			history = history.push(2);
			history = history.push(3);
			history = history.back();
			history = history.back();
			expect(history.current()).to.equal(1);
			history = history.forward();
			expect(history.current()).to.equal(2);
		});
	});

	describe('canForward', () => {
		it('only allowed when history and is not at final state', () => {
			expect(history.canForward()).to.be.false;
			history = history.push(1);
			history = history.push(2);
			expect(history.canForward()).to.be.false;
			history = history.back();
			expect(history.canForward()).to.be.true;
			history = history.forward();
			expect(history.canForward()).to.be.false;
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
			expect(history.current()).to.equal(1);

			history = history
				.push(1)
				.push(3)
				.push(2);

			history = history.jumpBack(comparer);
			expect(history.current()).to.equal(3);
		});
	});

	describe('canJumpBack', () => {
		it('only allowed when game has cached states', () => {
			expect(history.canJumpBack()).to.be.false;
			history = history.push(1);
			expect(history.canJumpBack()).to.be.false;
			history = history.push(2);
			expect(history.canJumpBack()).to.be.true;
			history = history.back();
			expect(history.canJumpBack()).to.be.false;
		});
	});
});
