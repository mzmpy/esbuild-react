const path = require('path')
const postCss = require('postcss')
const fs = require('fs')

module.exports = (options = {}) => {
  const cache = {}
  return {
    name: 'css-module',
    setup(build) {
      const transform = async (filePath) => {
        const data = await fs.promises.readFile(filePath, { encoding: 'utf-8' })
        const namespace = path.relative(process.cwd(), filePath).slice(0, -11).replace(path.sep, '__').replace(/\./g, '_')
        const ast = postCss.parse(data)
        const styles = {}

        ast.walkRules(/^\.\S+$/, (rule) => {
          const selector = rule.selector.slice(1)
          styles[selector] = `${namespace}--${selector}`
          rule.selector = `.${namespace}--${selector}`
        })

        const css = ast.toResult().css

        return {
          namespace,
          styles,
          css
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
