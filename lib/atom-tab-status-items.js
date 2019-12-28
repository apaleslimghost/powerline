'use babel'

import AtomTabStatusItemsView from './atom-tab-status-items-view'
import { CompositeDisposable } from 'atom'

export default {
	views: new Set(),
	subscriptions: null,
	diagnosticUpdater: null,
	iconClassForPath: null,

	activate() {
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
				atom.workspace.observePaneItems(item => {
					const pane = atom.workspace.paneForItem(item)
					const index = pane.getItems().indexOf(item)
					const tab = pane.element.querySelectorAll('.tab')[index]

					const view = new AtomTabStatusItemsView({
						container: tab,
						item,
						diagnosticUpdater: this.diagnosticUpdater,
						iconClassForPath: this.iconClassForPath,
					})

					this.views.add(view)
				}),
			)
		}
	},

	consumeDiagnosticUpdates(updater) {
		this.diagnosticUpdater = updater
	},

	consumeIcons({ iconClassForPath }) {
		this.iconClassForPath = iconClassForPath
	},

	deactivate() {
		// hmm
		this.subscriptions.dispose()
		this.views.forEach(view => view.destroy())
	},
}
