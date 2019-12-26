'use babel'

import * as items from './items'

export default class AtomTabStatusItemsView {
	constructor(properties) {
		this.properties = properties
		this.views = []

		this.render()
	}

	render() {
		this.views = Object.values(items).flatMap(Item => {
			if (Item.shouldDisplay(this.properties)) {
				const view = new Item(this.properties)
				view.element.style.order = Item.priority
				view.element.classList.add('tab-status-item')

				if (Item.align) {
					view.element.classList.add(`tab-status-item-${Item.align}`)
				}

				return [view]
			}

			return []
		})

		if (this.views.length) {
			this.properties.container.classList.add('tab-status')
			this.properties.container.innerHTML = ''
			this.views.forEach(view =>
				this.properties.container.appendChild(view.element),
			)
		}
	}

	destroy() {
		this.views.forEach(view => view.destroy())
	}
}
