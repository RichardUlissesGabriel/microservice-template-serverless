'use strict'

// eslint-disable-next-line import/no-absolute-path
const schema = require('schemas/joiSchema/hello-post-request')

module.exports.hello = async (event, context, callback) => {
  // O exemplo de json de entrada se encontra em testes/data.json
  let result = (event['body-json'] || event)

  // Nesse ponto consegue se saber qual o método utilizado {POST,GET,PUT}
  console.log(event.contex || {})

  console.log(schema['hello-post-request'].validate({
    "data": [
      {
        "table": {
          "nr_cod": "9",
          "ds_emite_nota": "N",
          "ds_cotacao": "N",
          "id_pedido": "XXXXX",
          "ds_parceiro": "XXXXXXX",
        }
      }
    ]
  }))
  // -------------------------------

  // Para devolver erros
  let response = {
    statusCode: 401,
    data: JSON.stringify([]),
    errors: JSON.stringify([{
      whatever: 'whatever'
    }])
  }
  callback(JSON.stringify(response)) // Erro

  // Para devolver sucesso
  response = {
    statusCode: 200,
    data: JSON.stringify([{
      whatever: 'whatever'
    }]),
    errors: JSON.stringify([])
  }

  callback(null, JSON.stringify(response)) // Sucesso
}
