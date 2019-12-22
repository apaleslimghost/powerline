'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class AtomTabStatusItemsView {
	constructor(item) {
		this.item = item
		etch.initialize(this)
	}

	render() {
		return <div>hello</div>
	}

	update(item) {
		if (this.item !== item) {
			this.item = item
			return etch.update(this)
		}
	}

	serialize() {}

	destroy() {
		return etch.destroy(this)
	}
}
