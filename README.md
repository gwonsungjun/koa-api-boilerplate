# generator-ca-express-api
<https://www.npmjs.com/package/generator-ca-express-api>

clean architecture pattern structure Node.js express - REST API   


## Installation

_Requires Node 8 or greater_

```shell
npm install -g yo generator-ca-express-api
```

## Generators

```shell
yo ca-express-api # generate a new project
```

## Directory structure

```
src
└── api
    ├── common
    │   └── response
    ├── config
    │   ├── express
    │   └── sequelize
    ├── core
    │   └── products
    │       ├── application
    │       ├── domain
    │       ├── infrastructure
    │       └── models
    └── web
        └── products
```

## License
[MIT](LICENSE)
