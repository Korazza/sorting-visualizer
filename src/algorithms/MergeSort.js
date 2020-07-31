import Algorithm from './Algorithm';

class MergeSort extends Algorithm {
	constructor() {
		super();
		this._name = 'MergeSort';
	}

	merge(array, start, mid, end) {
		let n = end - start + 1;
		let tmpArray = [];
		let left = start,
			right = mid + 1,
			index = 0;
		while (left <= mid && right <= end)
			tmpArray[index++] =
				array[left] <= array[right] ? array[left++] : array[right++];
		while (left <= mid) tmpArray[index++] = array[left++];
		while (right <= end) tmpArray[index++] = array[right++];
		for (let k = 0; k < n; k++) {
			array[start + k] = tmpArray[k];
			this._trace.frames.push({
				arrayFrame: [...array],
				redFrame: [start + k],
				sortedFrame: this._trace.lastSortedFrame,
			});
		}
	}

	sort(array, start = 0, end = array.length - 1) {
		if (start < end) {
			this._trace.frames.push({
				arrayFrame: [...array],
				yellowFrame: [...array.slice(start, end + 1).map((_, i) => i + start)],
				sortedFrame: this._trace.lastSortedFrame,
			});
			let mid = Math.floor((start + end) / 2);
			this.sort(array, start, mid);
			this.sort(array, mid + 1, end);
			this.merge(array, start, mid, end);
		}
	}
}

export default MergeSort;
