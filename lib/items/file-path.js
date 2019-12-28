'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { dirname } from 'path'
import { CompositeDisposable } from 'atom'

export default class FilePath {
	static get priority() {
		return 9
	}

	static shouldDisplay({ item }) {
		return item.getPath
	}

	constructor(properties) {
		this.properties = properties
		this.subscription = new CompositeDisposable(
			properties.item.onDidChangePath(() => {
				etch.update(this)
			}),
			properties.item.onDidChangeModified(() => {
				etch.update(this)
			}),
		)
		etch.initialize(this)
	}

	render() {
		const path = this.properties.item.getPath()
		if (!path) {
			return <em class='tab-status-item tab-status-item-primary'>Untitled</em>
		}

		const [projectPath, relativePath] = atom.project.relativizePath(path)
		return (
			<strong class='tab-status-item tab-status-item-primary'>
				{atom.project.rootDirectories.length > 1
					? dirname(projectPath) + '/'
					: null}
				{relativePath}

				{this.properties.item.isModified() ? (
					<span class='icon icon-right icon-primitive-dot text-warning' />
				) : null}
			</strong>
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
