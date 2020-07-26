import Algorithm from './Algorithm';
import Trace from './Trace';

class MergeSort extends Algorithm {
	constructor() {
		super();
		this._name = 'MergeSort';
	}

	run(array) {
		//const sortingArray = array.slice();
		this._trace = new Trace();
		// TODO
		return this._trace.frames;
	}
}

export default MergeSort;
