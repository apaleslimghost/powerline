'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class AtomTabStatusItemsView {
	constructor(properties) {
		this.properties = properties
		etch.initialize(this)
	}

	render() {
		const repo = this.getRepo()

		return repo ? <span>{repo.getShortHead()}</span> : null
	}

	update(newProps) {
		if (this.properties.item !== newProps.item) {
			this.properties.item = newProps.item
			return etch.update(this)
		}
	}

	getRepo() {
		if (this.properties.item.getPath) {
			const [rootDir] = atom.project.relativizePath(
				this.properties.item.getPath(),
			)
			const rootDirIndex = atom.project.getPaths().indexOf(rootDir)

			if (rootDirIndex >= 0) {
				return atom.project.getRepositories()[rootDirIndex]
			}

			for (const repo in atom.project.getRepositories())
				if (repo) {
					return repo
				}
		}
	}

	serialize() {}

	destroy() {
		return etch.destroy(this)
	}
}
