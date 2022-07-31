const esbuild = require('esbuild')
const esbuildCssModulePlugin = require('../plugins/esbuild-plugin-css-modules')

esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  // minify: true,
  loader: {
    '.js': 'jsx'
  },
  plugins: [esbuildCssModulePlugin()],
  outfile: './dist/index.js'
})
