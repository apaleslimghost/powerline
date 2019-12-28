'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import getRepo from '../get-repo'

// TODO opening diff

export default class GitStatus {
	static shouldDisplay({ item }) {
		return Boolean(getRepo(item))
	}

	constructor(properties) {
		this.properties = properties
		this.repo = getRepo(this.properties.item)
		this.subscription = this.properties.item.onDidSave(() => {
			etch.update(this)
		})
		etch.initialize(this)
	}

	render() {
		const { added, deleted } = this.repo.getDiffStats(
			this.properties.item.getPath(),
		)

		return (
			<span class='tab-status-item tab-status-item-right'>
				{added ? (
					<span class='tab-status-sub-item'>
						<span class='icon icon-diff-added' />
						{added}
					</span>
				) : null}
				{deleted ? (
					<span class='tab-status-sub-item'>
						<span class='icon icon-diff-removed' />
						{deleted}
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

	destroy() {
		return etch.destroy(this)
	}
}
