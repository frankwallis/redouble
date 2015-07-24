/**
 * Helper class for managing history
 * Pushing an item deletes any forward state
 * Immutable
 */
export class StateHistory {

	constructor(historyState) {
		if (historyState) {
			this.states = historyState.states;
			this.currentIdx = historyState.currentIdx;
		}
		else {
			this.states = [];
			this.currentIdx = -1;
		}
	}

	getState() {
		return {
			states: this.states,
			currentIdx: this.currentIdx
		};
	}

	push(state) {
		return new StateHistory({
			states: this.states.slice(0, this.currentIdx + 1).concat(state),
			currentIdx: this.currentIdx + 1
		});
	}

	current() {
		return this.states[this.currentIdx];
	}

	back() {
		return new StateHistory({
			states: this.states,
			currentIdx: this.currentIdx - 1
		});
	}

	canBack(): boolean {
		return (this.currentIdx > 0);
	}

	forward() {
		return new StateHistory({
			states: this.states,
			currentIdx: this.currentIdx + 1
		});
	}

	canForward() {
		return (this.currentIdx < this.states.length - 1);
	}

	jumpBack(comparer /* (startState, priorState) => boolean */ ) {
		let start = this.current();
		let newIdx = 0;

		for (let idx = this.currentIdx; idx >= 0; idx --) {
			if (comparer(start, this.states[idx])) {
				newIdx = idx;
				break;
			}
		}

		return new StateHistory({
			states: this.states,
			currentIdx: newIdx
		});
	}

	canJumpBack() {
		return (this.currentIdx > 0);
	}
}
