'use babel'
/** @jsx etch.dom */

import etch from 'etch'

function getRepo(item) {
	if (item && item.getPath) {
		const [rootDir] = atom.project.relativizePath(item.getPath())
		const rootDirIndex = atom.project.getPaths().indexOf(rootDir)

		if (rootDirIndex >= 0) {
			return atom.project.getRepositories()[rootDirIndex]
		}

		for (const repo of atom.project.getRepositories())
			if (repo) {
				return repo
			}
	}
}

export default class AtomTabStatusItemsView {
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
