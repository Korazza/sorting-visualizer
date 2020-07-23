import Algorithm from './Algorithm';
import Trace from '../Trace';

class BubbleSort extends Algorithm {
	constructor() {
		super();
		this._name = 'BubbleSort';
	}

	run(array) {
		const sortingArray = array.slice();
		this._trace = new Trace();
		for (let i = 0; i < sortingArray.length; i++) {
			for (let j = 0; j < sortingArray.length - 1 - i; j++) {
				this._trace.frames.push({
					comparingFrame: [j, j + 1],
					swappingFrame: [],
					heightFrame: [],
					sortedFrame: this._trace.lastSortedFrame,
				});
				if (sortingArray[j] > sortingArray[j + 1]) {
					let value1 = sortingArray[j + 1];
					let value2 = sortingArray[j];
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
					let tmp = sortingArray[j];
					sortingArray[j] = sortingArray[j + 1];
					sortingArray[j + 1] = tmp;
				}
			}
			this._trace.frames.push({
				comparingFrame: [],
				swappingFrame: [],
				heightFrame: [],
				sortedFrame: [
					...this._trace.lastSortedFrame,
					sortingArray.length - 1 - i,
				],
			});
		}
		return this._trace.frames;
	}
}

export default BubbleSort;
