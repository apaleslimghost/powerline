'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import getRepo from '../get-repo'

export default class GitRemoteStatus {
	static get priority() {
		return -7
	}

	static shouldDisplay({ item }) {
		const repo = getRepo(item)
		return item.getPath && repo && repo.getOriginURL(item.getPath())
	}

	constructor(properties) {
		this.properties = { ...properties, pushing: false }
		this.repo = getRepo(this.properties.item)
		this.subscription = this.repo.onDidChangeStatuses(() => {
			etch.update(this)
		})

		etch.initialize(this)
	}

	async push(options) {
		try {
			this.update({ pushing: true })
			// yikes
			const githubRepo = atom.packages
				.getActivePackage('github')
				.mainModule.getActiveRepository()

			const branch = await githubRepo.getCurrentBranch()

			await githubRepo.push(branch.getName(), {
				...options,
				refSpec: branch.getRefSpec('PUSH'),
			})
		} finally {
			this.update({ pushing: false })
		}
	}

	async pull(options) {
		try {
			this.update({ pushing: true })
			// yikes
			const githubRepo = atom.packages
				.getActivePackage('github')
				.mainModule.getActiveRepository()

			const branch = await githubRepo.getCurrentBranch()

			await githubRepo.pull(branch.getName(), {
				...options,
				refSpec: branch.getRefSpec('PULL'),
			})
		} finally {
			this.update({ pushing: false })
		}
	}

	render() {
		const upstream = this.repo.getUpstreamBranch()
		const { ahead, behind } = this.repo.getAheadBehindCount()

		return this.properties.pushing ? (
			<span class='tab-status-item tab-status-item-right icon icon-sync tab-status-rotate' />
		) : upstream ? (
			<button
				type='button'
				class='tab-status-item tab-status-item-right'
				onClick={() => {
					this.push()
					this.pull()
				}}
			>
				<span class='tab-status-sub-item'>
					<span class='icon icon-arrow-up' />
					{ahead}
				</span>
				<span class='tab-status-sub-item'>
					<span class='icon icon-arrow-down' />
					{behind}
				</span>
			</button>
		) : (
			<button
				type='button'
				class='tab-status-item tab-status-item-right icon icon-cloud-upload'
				onClick={() => this.push({ setUpstream: true })}
			/>
		)
	}

	update(newProps) {
		if (this.properties.item !== newProps.item) {
			this.properties.item = newProps.item
			return etch.update(this)
		}

		if (this.properties.pushing !== newProps.pushing) {
			this.properties.pushing = newProps.pushing
			return etch.update(this)
		}
	}

	serialize() {}

	destroy() {
		this.subscription.dispose()
		return etch.destroy(this)
	}
}
