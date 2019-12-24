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
				{Object.entries(items).map(([name, Item]) => (
					<Item key={name} item={this.properties.item} />
				))}
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
