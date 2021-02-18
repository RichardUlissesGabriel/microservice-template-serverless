# Microservice-api-serverless

Esse projeto contem uma template para a criação da estrutura de um APIGateway na AWS, Utilizando o framework serverless.

### Pré-requisitos

São necessários para execução:

```
Npm - instalação dos pacotes utilizados
Serverless - realização do deploy na AWS
```

### Instalação


Instalar o NVM:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
exportar a variável de ambiente NVM_DIR
```

```
nvm install <versão>
```

Navegar na raíz do projeto e instalar as dependências listadas no package.json

```
npm i
```

### Editando

Realizar alterações dentro do arquivo

```
serverless.yml
```

Como nome da api, dos modulos, definição das funções lambdas, etc..., ficando apto para a realização do deploy.

## Configurando credenciais

Para configurar sua credenciais seguir os passos descritos no link abaixo:
[configuração de credenciais](https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/)

## Documentação

Para a documentação é necessario configurar a documentação (sessão custom.documentation e events.http.documentation) para os módulos e funções desenvolvida dentro do serverless.yml.

Existe tambem o arquivo ./configserverless/swagger/models.yml, dentro dele é possível configurar partes de configurações para reutilização dentro do serverless.yml principal

Para maiores detalhes visitar o link do plugin no npm
[plugin de documentação](https://www.npmjs.com/package/serverless-aws-documentation)

## Padrão de entrada e saída de dados

Como definição será utilizado a padronização estabelecida pelo JsonAPI.org
Todos os microserviços devem esperar e retornar um json com essa padronização

Dentro da pasta 'testes/data.json' consta um exemplo completo desse json o mesmo pode ser visto no site do jsonapi.org
[Site com a documentação para o padrão](https://jsonapi.org/)

## Deploy

Para a realização do deploy na AWS é necessário somente realizar a sequencia de comandos git (add, commit, push).

Criar Estrutura:
```
O continuos integration está configurado no git e o deploy na AWS será feito de forma automatica.
```

Remover Estrutura:
```
rodar npm run remove:<dev|test>
```

As credenciais dos programadores terão acesso de manipulação somente nos ambientes de desenvolvimento (dev) e teste (test).

## Testando função localmente

npm run invoke-local <nome da função> testes/data.json

***Atenção***
Agora para execução local um script local foi desenvolvido para adicionar as dependências em layer.

Certifique-se que sua ***branch*** contenha a pasta ***/layers*** na versão mais atual.

## Autores

* **Richard Ulisses Gabriel** - *Trabalho inicial*.
