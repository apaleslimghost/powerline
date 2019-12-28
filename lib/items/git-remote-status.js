'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import getRepo from '../get-repo'

// TODO rerender on ???

export default class GitRemoteStatus {
	static get priority() {
		return -7
	}

	static shouldDisplay({ item }) {
		return Boolean(getRepo(item))
	}

	constructor(properties) {
		this.properties = properties
		etch.initialize(this)
	}

	render() {
		const repo = getRepo(this.properties.item)
		const upstream = repo.getUpstreamBranch()
		const { ahead, behind } = repo.getAheadBehindCount()

		return upstream ? (
			<span class='tab-status-item tab-status-item-right'>
				<span class='tab-status-sub-item'>
					<span class='icon icon-arrow-up' />
					{ahead}
				</span>
				<span class='tab-status-sub-item'>
					<span class='icon icon-arrow-down' />
					{behind}
				</span>
			</span>
		) : (
			<span class='tab-status-item tab-status-item-right icon icon-cloud-upload' />
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
