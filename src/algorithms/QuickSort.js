import Algorithm from './Algorithm';
import Trace from './Trace';

class QuickSort extends Algorithm {
	constructor() {
		super();
		this._name = 'QuickSort';
	}

	run(array) {
		//const sortingArray = array.slice();
		this._trace = new Trace();
		// TODO
		return this._trace.frames;
	}
}

export default QuickSort;
