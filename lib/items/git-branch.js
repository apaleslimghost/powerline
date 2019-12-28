'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import getRepo from '../get-repo'

// TODO branch checkout action

export default class GitBranch {
	static get priority() {
		return -6
	}

	static shouldDisplay({ item }) {
		return Boolean(getRepo(item))
	}

	constructor(properties) {
		this.properties = properties
		this.subscription = getRepo(this.properties.item).onDidChangeStatuses(
			() => {
				etch.update(this)
			},
		)
		etch.initialize(this)
	}

	render() {
		const repo = getRepo(this.properties.item)

		return (
			<span class='tab-status-item tab-status-item-right'>
				<span class='icon icon-git-branch' />
				{repo.getShortHead()}
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
