import Algorithm from './Algorithm';

class BubbleSort extends Algorithm {
	constructor() {
		super();
		this._name = 'BubbleSort';
	}

	sort(array) {
		for (let i = 0; i < array.length; i++) {
			for (let j = 0; j < array.length - 1 - i; j++) {
				this._trace.frames.push({
					arrayFrame: [...array],
					yellowFrame: [j, j + 1],
					sortedFrame: this._trace.lastSortedFrame,
				});
				if (array[j] > array[j + 1]) {
					this.swap(array, j, j + 1);
					this._trace.frames.push({
						arrayFrame: [...array],
						redFrame: [j, j + 1],
						sortedFrame: this._trace.lastSortedFrame,
					});
				}
			}
			this._trace.frames.push({
				arrayFrame: [...array],
				sortedFrame: [...this._trace.lastSortedFrame, array.length - 1 - i],
			});
		}
	}
}

export default BubbleSort;
