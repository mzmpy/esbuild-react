const parcelCss = require('@parcel/css')
const fs = require('fs')
const path = require('path')

module.exports = (options = {}) => {
	return {
		name: 'parcel-css-plugin',
		setup(build) {
			const transform = async (filePath) => {
				const data = await fs.promises.readFile(filePath, { encoding: 'utf-8' })
        const namespace = path.relative(process.cwd(), filePath).slice(0, -11).replace(path.sep, '__').replace(/\./g, '_')
				const classMap = {}

				const resCode = parcelCss.transform({
					filename: namespace,
					code: Buffer.from(data),
					minify: options.minify || true,
					sourceMap: options.sourceMap || false,
					inputSourceMap: options.inputSourceMap,
					targets: options.targets,
					drafts: options.drafts,
					cssModules: options.cssModules || false
				})

				for(const key in resCode.exports) {
					classMap[key] = resCode.exports[key].name
				}

				return {
          namespace: namespace,
          styles: classMap,
          css: resCode.code.toString()
        }
			}

			const cssMap = new Map()

      build.onLoad({ filter: /\.module\.css/ }, async (args) => {
        const { namespace, styles, css } = await transform(args.path)

        const importPath = `css-module://${namespace}`
        cssMap.set(importPath, css)

        return {
          contents: `import '${importPath}'\nexport default ${JSON.stringify(styles)}\n`
        }
      })

      build.onResolve({ filter: /css-module:\/\// }, (args) => {
        return {
          path: args.path,
          namespace: 'css-module'
        }
      })

      build.onLoad({ filter: /.*/, namespace: 'css-module' }, (args) => {
        return {
          contents: cssMap.get(args.path),
          loader: 'css'
        }
      })
		}
	}
}


