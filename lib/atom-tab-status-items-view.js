'use babel'

import * as items from './items'
import { ResizeObserver } from '@juggle/resize-observer'

export default class AtomTabStatusItemsView {
	constructor(properties) {
		this.properties = properties
		this.views = []
		this.nodeMap = new Map()

		this.render()
	}

	render() {
		this.views = Object.values(items)
			.sort((a, b) => b.priority - a.priority)
			.flatMap(Item => {
				if (Item.shouldDisplay(this.properties)) {
					const view = new Item(this.properties)

					return [view]
				}

				return []
			})

		if (this.views.length) {
			const sizeMap = new WeakMap()
			let maxWidth = Infinity

			this.properties.container.classList.add('tab-status')
			this.nodeMap.set(
				this.properties.container,
				Array.from(this.properties.container.childNodes),
			)

			while (this.properties.container.firstChild)
				this.properties.container.firstChild.remove()

			this.observer = new ResizeObserver(entries => {
				for (const entry of entries) {
					if (entry.target === this.properties.container) {
						maxWidth = entry.borderBoxSize.inlineSize
					} else if (
						!entry.target.classList.contains('tab-status-item-hidden')
					) {
						sizeMap.set(entry.target, entry.borderBoxSize.inlineSize)
					}
				}

				;[...this.views]
					.sort(
						(a, b) =>
							Math.abs(b.constructor.priority) -
							Math.abs(a.constructor.priority),
					)
					.reduce((totalWidth, view) => {
						const width = totalWidth + sizeMap.get(view.element)
						view.element.classList.toggle(
							'tab-status-item-hidden',
							width > maxWidth,
						)
						return width
					}, 0)
			})

			this.observer.observe(this.properties.container)

			this.views.forEach(view => {
				this.properties.container.appendChild(view.element)
				this.observer.observe(view.element)
			})
		}
	}

	destroy() {
		if (this.observer) this.observer.disconnect()
		this.views.forEach(view => view.destroy())
		this.nodeMap.forEach((nodes, container) => {
			console.log(nodes)
			nodes.forEach(node => {
				container.appendChild(node)
			})
		})
		this.nodeMap.clear()
	}
}
