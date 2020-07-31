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
			purpleFrame: [pivotIndex],
			sortedFrame: this._trace.lastSortedFrame,
		});
		for (let i = start + 1; i <= end; i++) {
			this._trace.frames.push({
				yellowFrame: [i],
				purpleFrame: [pivotIndex],
				sortedFrame: this._trace.lastSortedFrame,
			});
			if (array[i] < pivotValue) {
				pivotIndex++;
				this._trace.frames.push({
					redFrame: [i],
					purpleFrame: [pivotIndex],
					heightFrame: [
						i,
						{ newHeight: array[pivotIndex], oldHeight: array[i] },
						pivotIndex,
						{ newHeight: array[i], oldHeight: array[pivotIndex] },
					],
					sortedFrame: this._trace.lastSortedFrame,
				});
				this.swap(array, i, pivotIndex);
			}
		}
		if (pivotIndex !== start)
			this._trace.frames.push({
				redFrame: [start],
				purpleFrame: [pivotIndex],
				heightFrame: [
					start,
					{ newHeight: array[pivotIndex], oldHeight: array[start] },
					pivotIndex,
					{ newHeight: array[start], oldHeight: array[pivotIndex] },
				],
				sortedFrame: this._trace.lastSortedFrame,
			});
		this.swap(array, start, pivotIndex);
		return pivotIndex;
	}

	sort(array, start, end) {
		if (start >= end) {
			if (start === end)
				this._trace.frames.push({
					sortedFrame: [...this._trace.lastSortedFrame, start],
				});
			return;
		}
		let index = this.partition(array, start, end);
		this._trace.frames.push({
			sortedFrame: [...this._trace.lastSortedFrame, index],
		});
		this.sort(array, start, index - 1);
		this.sort(array, index + 1, end);
	}
}

export default QuickSort;
