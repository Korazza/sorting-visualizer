import Trace from './Trace';

class Algorithm {
	constructor() {
		this._trace = null;
	}

	get name() {
		return this._name;
	}

	swap(array, i, j) {
		let tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}

	run(array) {
		let tmpArray = array.slice();
		this._trace = new Trace();
		this.sort(tmpArray, 0, tmpArray.length - 1);
		if (this._trace.lastSortedFrame.length < array.length)
			this._trace.frames.push({
				arrayFrame: [...tmpArray],
				sortedFrame: [...array.map((_, i) => i)],
			});
		return this._trace.frames;
	}
}

export default Algorithm;
