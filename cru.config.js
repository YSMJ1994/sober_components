module.exports = {
	output: {
		doc: 'build-doc',
		library: 'build-library'
	},
	static: {
		doc: 'public',
		library: 'libraryStatic',
	},
	src: {
		doc: 'doc',
		library: 'components'
	},
	enableBabelImport: true,
	cssPreprocessor: 'scss',
	typescript: true,
	pkg: 'yarn'
}
