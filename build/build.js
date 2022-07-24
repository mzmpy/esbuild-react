const esbuild = require('esbuild')

esbuild.buildSync({
  entryPoints: ['./src/index.js'],
  bundle: true,
  // minify: true,
  loader: {
    '.js': 'jsx'
  },
  outfile: './dist/index.js'
})
