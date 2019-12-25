'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import * as items from './items'

export default class AtomTabStatusItemsView {
	constructor(properties) {
		this.properties = properties
		etch.initialize(this)
	}

	render() {
		return (
			<div className='tab-status-items'>
				{Object.entries(items).flatMap(([name, Item]) =>
					Item.shouldDisplay(this.properties)
						? [<Item key={name} {...this.properties} />]
						: [],
				)}
			</div>
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
		return etch.destroy(this)
	}
}
