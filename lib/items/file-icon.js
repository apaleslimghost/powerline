'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class FileIcon {
	static get priority() {
		return 6
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
		const grammar = this.properties.item.getGrammar()

		return (
			<button
				type='button'
				class='tab-status-item'
				onClick={() => {
					atom.commands.dispatch(
						this.properties.item.element,
						'grammar-selector:show',
					)
				}}
			>
				<span class={`icon ${icon.join(' ')}`} />
				{!grammar || grammar.name === 'Null Grammar' ? '' : grammar.name}
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
