'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class AtomTabStatusItemsView {
	static shouldDisplay(item) {
		return item.element && item.element.classList.contains('vim-mode-plus')
	}

	constructor(properties) {
		this.properties = { ...properties, mode: '' }
		this.observer = new MutationObserver(this.updateMode.bind(this))
		this.observer.observe(this.properties.item.element, { attributes: true })
		etch.initialize(this)
	}

	render() {
		return <span>{this.properties.mode}</span>
	}

	updateMode(mutations) {
		for (const mutation of mutations)
			if (mutation.attributeName === 'class') {
				if (mutation.target.classList.contains('normal-mode')) {
					this.update({ mode: 'normal' })
				} else if (mutation.target.classList.contains('insert-mode')) {
					this.update({ mode: 'insert' })
				} else if (mutation.target.classList.contains('visual-mode')) {
					this.update({ mode: 'visual' })
				}
			}
	}

	update(newProps) {
		if (this.properties.item !== newProps.item) {
			this.properties.item = newProps.item
			return etch.update(this)
		}

		if (this.properties.mode !== newProps.mode) {
			this.properties.mode = newProps.mode
			return etch.update(this)
		}
	}

	serialize() {}

	async destroy() {
		await etch.destroy(this)
		this.observer.disconnect()
	}
}
