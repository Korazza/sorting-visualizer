class Trace {
	constructor() {
		this._frames = [
			{
				arrayFrame: [],
				yellowFrame: [],
				redFrame: [],
				purpleFrame: [],
				sortedFrame: [],
			},
		];
	}

	get frames() {
		return this._frames;
	}

	get lastSortedFrame() {
		return this._frames[this._frames.length - 1].sortedFrame;
	}
}

export default Trace;
