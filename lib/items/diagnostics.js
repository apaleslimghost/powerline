'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class AtomTabStatusItemsView {
	static shouldDisplay({ item, diagnosticUpdater }) {
		return item.getPath && diagnosticUpdater
	}

	constructor(properties) {
		this.properties = { ...properties, messages: [] }
		this.subscription = this.properties.diagnosticUpdater.observeFileMessages(
			this.properties.item.getPath(),
			({ messages }) => {
				this.properties.messages = messages
				etch.update(this)
			},
		)
		etch.initialize(this)
	}

	render() {
		const [errors, warnings] = this.properties.messages.reduce(
			([errors, warnings], message) => [
				message.type === 'Error' ? ++errors : errors,
				message.type === 'Warning' ? ++warnings : warnings,
			],
			[0, 0],
		)

		return (
			<span>
				{errors > 0 ? (
					<span class='text-error'>
						<span class='icon icon-issue-opened' />
						{errors}
					</span>
				) : null}
				{warnings > 0 ? (
					<span class='text-warning'>
						<span class='icon icon-alert' />
						{warnings}
					</span>
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

	async destroy() {
		await etch.destroy(this)
	}
}
