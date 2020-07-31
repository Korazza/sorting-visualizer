import Algorithm from './Algorithm';

class InsertionSort extends Algorithm {
	constructor() {
		super();
		this._name = 'InsertionSort';
	}

	sort(array) {
		for (let i = 1; i < array.length; ++i) {
			let insert = array[i];
			this._trace.frames.push({
				purpleFrame: [i],
				sortedFrame: this._trace.lastSortedFrame,
			});
			let j = i - 1;
			for (; j >= 0 && array[j] > insert; --j) {
				this._trace.frames.push({
					yellowFrame: [j],
					purpleFrame: [i],
					sortedFrame: this._trace.lastSortedFrame,
				});
				this._trace.frames.push({
					redFrame: [j + 1],
					purpleFrame: [i],
					heightFrame: [
						j + 1,
						{ newHeight: array[j], oldHeight: array[j + 1] },
					],
					sortedFrame: this._trace.lastSortedFrame,
				});
				array[j + 1] = array[j];
			}
			this._trace.frames.push({
				redFrame: [j + 1],
				purpleFrame: [i],
				heightFrame: [j + 1, { newHeight: insert, oldHeight: array[j + 1] }],
				sortedFrame: this._trace.lastSortedFrame,
			});
			array[j + 1] = insert;
		}
		this._trace.frames.push({
			sortedFrame: [...array.map((_, i) => i)],
		});
	}
}

export default InsertionSort;
