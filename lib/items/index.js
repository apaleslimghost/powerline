'use babel'

export { default as GitStatus } from './git-status'
export { default as GitBranch } from './git-branch'
export { default as GitRemoteStatus } from './git-remote-status'
export { default as VimStatus } from './vim-status'
export { default as Diagnostics } from './diagnostics'
export { default as FilePath } from './file-path'
export { default as FileModified } from './file-modified'

// TODO:
// git modified status (per file? per repo?)
// language icon
// automatic truncation
// current file position
// actions eg branch dialog, diagnostics
// styling! (how powerline to go)
