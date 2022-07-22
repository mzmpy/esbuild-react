const esbuild = require('esbuild')

esbuild.serve({
  port: 3888,
  host: '127.0.0.1',
  servedir: '/dist',
  onRequest: (args) => {
    console.log(`${args.method}-User ${args.remoteAddress} accesses path ${args.path} with server responsing status code ${args.status} in ${args.timeInMS} ms.`)
  }
}, {
  entryPoints: ['./src/index.js'],
  bundle: true,
  minify: true,
  loader: {
    '.js': 'jsx'
  },
  outfile: './dist/index.js'
}).then((service) => {
  console.log(`Esbuild serve at http://${service.host}:${service.port}.`)
})
