'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class FilePath {
	static get priority() {
		return 1
	}

	static shouldDisplay({ item }) {
		return item.onDidChangeModified && item.isModified
	}

	constructor(properties) {
		this.properties = { ...properties }
		this.subscription = properties.item.onDidChangeModified(() => {
			etch.update(this)
		})

		etch.initialize(this)
	}

	render() {
		return (
			<span class='tab-status-item'>
				{this.properties.item.isModified() ? (
					<span class='icon icon-primitive-dot text-warning' />
				) : null}
			</span>
		)
	}

	update(newProps) {
		if (this.properties.item !== newProps.item) {
			this.properties.item = newProps.item
			return etch.update(this)
		}
	}

	serialize() {}

	destroy() {
		this.subscription.dispose()
		return etch.destroy(this)
	}
}
