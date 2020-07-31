import Algorithm from './Algorithm';

class QuickSort extends Algorithm {
	constructor() {
		super();
		this._name = 'QuickSort';
	}

	partition(array, start, end) {
		console.log(array, start, end);
		let pivotValue = array[start];
		let pivotIndex = start;
		this._trace.frames.push({
			arrayFrame: [...array],
			purpleFrame: [pivotIndex],
			sortedFrame: this._trace.lastSortedFrame,
		});
		for (let i = start + 1; i <= end; i++) {
			this._trace.frames.push({
				arrayFrame: [...array],
				yellowFrame: [i],
				purpleFrame: [pivotIndex],
				sortedFrame: this._trace.lastSortedFrame,
			});
			if (array[i] < pivotValue) {
				pivotIndex++;
				this.swap(array, i, pivotIndex);
				this._trace.frames.push({
					arrayFrame: [...array],
					redFrame: [i],
					purpleFrame: [pivotIndex],
					sortedFrame: this._trace.lastSortedFrame,
				});
			}
		}
		this.swap(array, start, pivotIndex);
		if (pivotIndex !== start)
			this._trace.frames.push({
				arrayFrame: [...array],
				redFrame: [start],
				purpleFrame: [pivotIndex],
				sortedFrame: this._trace.lastSortedFrame,
			});
		return pivotIndex;
	}

	sort(array, start, end) {
		if (start >= end) {
			if (start === end)
				this._trace.frames.push({
					arrayFrame: [...array],
					sortedFrame: [...this._trace.lastSortedFrame, start],
				});
			return;
		}
		let index = this.partition(array, start, end);
		this._trace.frames.push({
			arrayFrame: [...array],
			sortedFrame: [...this._trace.lastSortedFrame, index],
		});
		this.sort(array, start, index - 1);
		this.sort(array, index + 1, end);
	}
}

export default QuickSort;
