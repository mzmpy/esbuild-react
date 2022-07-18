const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve(__dirname, '../static/index.html'), { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err
  
  const replace = '<!-- inject jscode here! --><script type="text/javascript" src="./index.js"></script>'
  data = data.replace('<!-- inject jscode here! -->', replace)

  fs.writeFile(path.resolve(__dirname, '../dist/index.html'), data, err => {
    if (err) throw err
  })
})
