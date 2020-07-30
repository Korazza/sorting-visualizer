import Algorithm from './Algorithm';
import Trace from './Trace';

class QuickSort extends Algorithm {
	constructor() {
		super();
		this._name = 'QuickSort';
	}

	partition(array, start, end) {
		let pivot = start;
		this._trace.frames.push({
			purpleFrame: [pivot],
			sortedFrame: this._trace.lastSortedFrame,
		});
		for (let i = start; i < end; i++) {
			if (i !== start)
				this._trace.frames.push({
					yellowFrame: [i],
					purpleFrame: [pivot],
					sortedFrame: this._trace.lastSortedFrame,
				});
			if (array[i] < array[end]) {
				this._trace.frames.push({
					redFrame: [i],
					purpleFrame: [pivot],
					heightFrame: [
						pivot,
						{ newHeight: array[i], oldHeight: array[pivot] },
						i,
						{ newHeight: array[pivot], oldHeight: array[i] },
					],
					sortedFrame: this._trace.lastSortedFrame,
				});
				this.swap(array, i, pivot);
				pivot++;
			}
		}
		if (start !== end)
			this._trace.frames.push({
				redFrame: [end],
				purpleFrame: [pivot],
				heightFrame: [
					pivot,
					{ newHeight: array[end], oldHeight: array[pivot] },
					end,
					{ newHeight: array[pivot], oldHeight: array[end] },
				],
				sortedFrame: this._trace.lastSortedFrame,
			});
		this.swap(array, pivot, end);
		return pivot;
	}

	sort(array, start, end) {
		if (start > end) return;
		let index = this.partition(array, start, end);
		this._trace.frames.push({
			sortedFrame: [...this._trace.lastSortedFrame, index],
		});
		this.sort(array, start, index - 1);
		this.sort(array, index + 1, end);
	}

	run(array) {
		let tmp = array.slice();
		this._trace = new Trace();
		this.sort(tmp, 0, tmp.length - 1);
		return this._trace.frames;
	}
}

export default QuickSort;
