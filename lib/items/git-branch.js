'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import getRepo from '../get-repo'

// TODO changing branch (rerender & action)

export default class GitBranch {
	static shouldDisplay({ item }) {
		return Boolean(getRepo(item))
	}

	constructor(properties) {
		this.properties = properties
		etch.initialize(this)
	}

	render() {
		const repo = getRepo(this.properties.item)

		return (
			<span>
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
		return etch.destroy(this)
	}
}
