import { Op } from 'sequelize'
import fs from 'fs'
import path from 'path'

export default ({ sequelize, baseFolder, indexFile = 'index.js' }) => {
  const loaded = {}

  fs.readdirSync(baseFolder)
    .filter(file => file.indexOf('.') !== 0 && file !== indexFile && file.slice(-3) === '.js')
    .forEach(file => {
      const model = require(path.join(`${__dirname}/models`, file)).default(sequelize)
      const modelName = file.split('.')[0]
      loaded[modelName] = model
    })

  Object.keys(loaded).forEach(modelName => {
    if (loaded[modelName].associate) {
      loaded[modelName].associate(loaded)
    }
  })

  loaded.database = sequelize
  loaded.database.Op = Op

  return loaded
}
