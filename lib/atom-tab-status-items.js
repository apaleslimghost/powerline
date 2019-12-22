'use babel'
/* global atom */

import AtomTabStatusItemsView from './atom-tab-status-items-view'
import { CompositeDisposable } from 'atom'

export default {
	views: new Set(),
	subscriptions: null,

	activate() {
		this.atomTabStatusItemsView = new AtomTabStatusItemsView()

		if (atom.packages.isPackageActive('tabs')) {
			load()
		} else {
			const onceActivated = atom.packages.onDidActivatePackage(p => {
				if (p.name === 'tabs') {
					load()
					onceActivated.dispose()
				}
			})
		}

		const load = () => {
			this.subscriptions = new CompositeDisposable(
				atom.workspace.observePanes(pane => {
					pane.element.querySelectorAll('.tab').forEach((tab, i) => {
						const item = pane.itemAtIndex(i)
						const view = new AtomTabStatusItemsView(item)

						this.views.add(view)
						tab.appendChild(view.element)
					})
				}),
			)
		}
	},

	deactivate() {
		this.subscriptions.dispose()
		this.views.forEach(view => view.destroy())
	},
}
