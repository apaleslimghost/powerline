'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import getRepo from '../get-repo'
import url from 'url'

export default class GitStatus {
	static get priority() {
		return -8
	}

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

		const patchURL = url.format({
			protocol: 'atom-github',
			hostname: 'file-patch',
			slashes: true,
			pathname: encodeURIComponent(
				atom.project.relativize(this.properties.item.getPath()),
			),
			query: {
				workdir: this.repo.getWorkingDirectory(),
				stagingStatus: 'unstaged',
			},
		})

		return (
			<button
				type='button'
				class='tab-status-item tab-status-item-right'
				onClick={() => atom.workspace.open(patchURL)}
			>
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
			</button>
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
