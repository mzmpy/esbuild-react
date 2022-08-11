const esbuild = require('esbuild')
const esbuildCssModulePlugin = require('../plugins/esbuild-plugin-css-modules')
const esbuildPluginParcelCss = require('../plugins/esbuild-plugin-parcel-css')

esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  // minify: true,
  loader: {
    '.js': 'jsx'
  },
  // plugins: [esbuildCssModulePlugin()],
  // plugins: [esbuildPluginParcelCss()],
  plugins: [esbuildPluginParcelCss({
    cssModules: {
      pattern: '[name]-[hash]-[local]'
    }
  })],
  outfile: './dist/index.js'
}).catch(() => process.exit(1))
