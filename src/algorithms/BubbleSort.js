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
					yellowFrame: [j, j + 1],
					sortedFrame: this._trace.lastSortedFrame,
				});
				if (array[j] > array[j + 1]) {
					let value1 = array[j + 1];
					let value2 = array[j];
					this._trace.frames.push({
						redFrame: [j, j + 1],
						heightFrame: [
							j,
							{ newHeight: value1, oldHeight: value2 },
							j + 1,
							{ newHeight: value2, oldHeight: value1 },
						],
						sortedFrame: this._trace.lastSortedFrame,
					});
					this.swap(array, j, j + 1);
				}
			}
			this._trace.frames.push({
				sortedFrame: [...this._trace.lastSortedFrame, array.length - 1 - i],
			});
		}
	}
}

export default BubbleSort;
