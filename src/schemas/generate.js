const fs = require('fs')
const path = require('path')
const pathFiles = './src/schemas/files'

function generate () {
  const files = []

  fs.readdirSync(`${pathFiles}`).forEach(file => {
    files.push({ name: path.parse(file).name, schema: require(`./files/${file}`) })
  })

  function getTabs (qtdTabs) {
    let result = ''
    for (let i = 0; i < qtdTabs; ++i) {
      result += '  '
    }

    return result
  }

  const getType = {
    array: (qtdTabs, required, field, value, build) => {
      const stringTabs = getTabs(qtdTabs)
      return `${stringTabs}${field}: Joi.array().items(\n${build(value, ++qtdTabs)}${stringTabs})${required ? '.min(1).required()' : ''},\n`
    },

    object: (qtdTabs, required, field, value, build) => {
      const stringTabs = getTabs(qtdTabs)
      if (isNaN(field)) { // true se não for um numero valido
        return `${stringTabs}${field}: Joi.object({\n${build(value, ++qtdTabs)}${stringTabs}})${required ? '.required()' : ''},\n`
      }

      return `${stringTabs}Joi.object({\n${build(value, ++qtdTabs)}${stringTabs}})${required ? '.required()' : ''},\n`
    },

    string: (qtdTabs, required, field) => {
      if (isNaN(field)) { // true se não for um numero valido
        return `${getTabs(qtdTabs)}${field}: Joi.string()${required ? '.required()' : ''},\n`
      }

      return `${getTabs(qtdTabs)}Joi.string()${required ? '.required()' : ''},\n`
    },

    number: (qtdTabs, required, field) => {
      if (isNaN(field)) { // true se não for um numero valido
        return `${getTabs(qtdTabs)}${field}: Joi.number()${required ? '.required()' : ''},\n`
      }

      return `${getTabs(qtdTabs)}Joi.number()${required ? '.required()' : ''},\n`
    },

    email: (qtdTabs, required, field) => {
      if (isNaN(field)) { // true se não for um numero valido
        return `${getTabs(qtdTabs)}${field}: Joi.string().email({ minDomainSegments: 2 })${required ? '.required()' : ''},\n`
      }

      return `${getTabs(qtdTabs)}Joi.string().email({ minDomainSegments: 2 })${required ? '.required()' : ''},\n`
    },

    date: (qtdTabs, required, field) => {
      if (isNaN(field)) { // true se não for um numero valido
        return `${getTabs(qtdTabs)}${field}: Joi.date()${required ? '.required()' : ''},\n`
      }

      return `${getTabs(qtdTabs)}Joi.date()${required ? '.required()' : ''},\n`
    },

    'date-time': (qtdTabs, required, field) => {
      if (isNaN(field)) { // true se não for um numero valido
        return `${getTabs(qtdTabs)}${field}: Joi.date()${required ? '.required()' : ''},\n`
      }

      return `${getTabs(qtdTabs)}Joi.date()${required ? '.required()' : ''},\n`
    },

    double: (qtdTabs, required, field) => {
      if (isNaN(field)) { // true se não for um numero valido
        return `${getTabs(qtdTabs)}${field}: Joi.number()${required ? '.required()' : ''},\n`
      }

      return `${getTabs(qtdTabs)}Joi.number()${required ? '.required()' : ''},\n`
    },

    boolean: (qtdTabs, required, field) => {
      if (isNaN(field)) { // true se não for um numero valido
        return `${getTabs(qtdTabs)}${field}: Joi.boolean()${required ? '.required()' : ''},\n`
      }

      return `${getTabs(qtdTabs)}Joi.boolean()${required ? '.required()' : ''},\n`
    }
  }

  function build (schema, qtdTabs = 1) {
    let newSchema = ''
    Object.entries(schema).map(([field, value]) => {
      let type = ''
      let required = false

      if (Array.isArray(value)) {
        type = 'array'
      } else if (typeof value === 'object') {
        type = 'object'
      } else {
        type = value
      }

      if (field.includes('.required')) {
        field = field.replace('.required', '')
        required = true
      }

      newSchema += getType[type](qtdTabs, required, field, value, build)
    })

    return newSchema.replace(/,([^,]*)$/, '$1')
  }

  for (const file of files.filter(file => file.name.split('-')[2] === 'request')) {
    // Recursive function

    // creating string file
    let schema = '// Make by generate script\n'
    schema += 'const Joi = require(\'joi\')\n\n'
    schema += `module.exports['${file.name}'] = Joi.object({\n${build(file.schema)}})\n`

    // writing file on directory
    const dir = './src/schemas/joiSchema'

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    fs.writeFileSync(`${dir}/${file.name}.js`, schema)
    console.log(`Arquivo ${file.name} gerado com sucesso!`)
  }

  return files
}
generate()
