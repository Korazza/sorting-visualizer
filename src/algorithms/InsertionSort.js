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
				arrayFrame: [...array],
				purpleFrame: [i],
				sortedFrame: this._trace.lastSortedFrame,
			});
			let j = i - 1;
			for (; j >= 0 && array[j] > insert; --j) {
				this._trace.frames.push({
					arrayFrame: [...array],
					yellowFrame: [j],
					purpleFrame: [i],
					sortedFrame: this._trace.lastSortedFrame,
				});
				array[j + 1] = array[j];
				this._trace.frames.push({
					arrayFrame: [...array],
					redFrame: [j + 1],
					purpleFrame: [i],
					sortedFrame: this._trace.lastSortedFrame,
				});
			}
			array[j + 1] = insert;
			this._trace.frames.push({
				arrayFrame: [...array],
				redFrame: [j + 1],
				purpleFrame: [i],
				sortedFrame: this._trace.lastSortedFrame,
			});
		}
		this._trace.frames.push({
			arrayFrame: [...array],
			sortedFrame: [...array.map((_, i) => i)],
		});
	}
}

export default InsertionSort;
