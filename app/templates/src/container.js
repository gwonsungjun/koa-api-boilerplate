import { createContainer, asClass, InjectionMode, asValue, Lifetime } from 'awilix'
import path from 'path'

import { database, Product } from 'infrastructure/sequelize/models'

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
})

// register database
container.register({
  database: asValue(database),
})

// register web, domain, repository
container.loadModules(['data/*Repository.js', 'domain/usecase/*Service.js', 'web/rest/*Controller.js'], {
  formatName: 'camelCase',
  cwd: path.resolve(__dirname),
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asClass,
  },
})

// register sequelize models
container.register({
  productModel: asValue(Product),
})

// eslint-disable-next-line no-console
console.log(container)

export default container
