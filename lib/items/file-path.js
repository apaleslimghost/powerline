'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class FilePath {
	static get align() {
		return 'left'
	}

	static get priority() {
		return 0
	}

	static shouldDisplay({ item }) {
		return Boolean(item.getPath)
	}

	constructor(properties) {
		this.properties = properties
		etch.initialize(this)
	}

	render() {
		const [, relativePath] = atom.project.relativizePath(
			this.properties.item.getPath(),
		)
		return <span>{relativePath}</span>
	}

	update(newProps) {
		if (this.properties.item !== newProps.item) {
			this.properties.item = newProps.item
			return etch.update(this)
		}
	}

	serialize() {}

	destroy() {
		return etch.destroy(this)
	}
}
