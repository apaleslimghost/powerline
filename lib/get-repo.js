'use babel'

export default function getRepo(item) {
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
