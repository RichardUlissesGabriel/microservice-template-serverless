const fs = require('fs')
const path = require('path')
const pathFiles = 'schemas/files'

module.exports.schemas = () => {  
  const files = []

  fs.readdirSync(`./src/${pathFiles}`).forEach(file => {
    files.push({ name: path.parse(file).name, schema: require(`${pathFiles}/${file}`)})
  })

  return files
}
