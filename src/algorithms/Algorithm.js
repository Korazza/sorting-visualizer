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
}

export default Algorithm;
