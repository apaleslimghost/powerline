'use babel'
/** @jsx etch.dom */

import etch from 'etch'

// todo click for language selector

export default class FileIcon {
	static get priority() {
		return 1
	}

	static shouldDisplay({ item }) {
		return item.getPath
	}

	constructor(properties) {
		this.properties = properties
		this.subscription = this.properties.item.onDidChangeGrammar(() => {
			etch.update(this)
		})
		etch.initialize(this)
	}

	render() {
		const path = this.properties.item.getPath()
		const icon = this.properties.iconClassForPath(path)

		return (
			<button class='tab-status-item' onClick={() => alert('hello')}>
				<span class={`icon ${icon.join(' ')}`} />
				{this.properties.item.getGrammar().name}
			</button>
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
