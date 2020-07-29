import Algorithm from './Algorithm';
import Trace from './Trace';

class BubbleSort extends Algorithm {
	constructor() {
		super();
		this._name = 'BubbleSort';
	}

	sort(array) {
		for (let i = 0; i < array.length; i++) {
			for (let j = 0; j < array.length - 1 - i; j++) {
				this._trace.frames.push({
					comparingFrame: [j, j + 1],
					swappingFrame: [],
					heightFrame: [],
					sortedFrame: this._trace.lastSortedFrame,
				});
				if (array[j] > array[j + 1]) {
					let value1 = array[j + 1];
					let value2 = array[j];
					this._trace.frames.push({
						comparingFrame: [],
						swappingFrame: [j, j + 1],
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
				comparingFrame: [],
				swappingFrame: [],
				heightFrame: [],
				sortedFrame: [...this._trace.lastSortedFrame, array.length - 1 - i],
			});
		}
	}

	run(array) {
		this._trace = new Trace();
		this.sort(array.slice());
		return this._trace.frames;
	}
}

export default BubbleSort;
