import P from 'bluebird'
import { createContext } from 'dataloader-sequelize'
import glob from 'glob'
import { forEach, isArray } from 'lodash'
import Sequelize from 'sequelize'
import { db } from '../index'

let sequelize

if (db.uri && db.uri.length > 0) {
  sequelize = new Sequelize(db.uri, db.options)
} else {
  sequelize = new Sequelize(db.options)
}

const models = {}

const files = glob.sync('/src/api/core/**/models/*.js', {
  root: process.cwd(),
})

forEach(files, file => {
  if (/.*\/index\.js/.test(file)) {
    return
  }
  const model = sequelize.import(file)
  models[model.name] = model
})

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)

    forEach(models[modelName].associations, (model, name) => {
      models[modelName].prototype[`destroy${name}`] = async function(options = {}) {
        return this[`get${name}`]().then(rs =>
          isArray(rs) ? P.map(rs, r => r.destroy(options)) : rs ? rs.destroy(options) : Promise.resolve(),
        )
      }

      models[modelName].prototype[`bulkCreate${name}`] = async function(values, options = {}) {
        return models[name].bulkCreate(
          values.map(v => ({
            ...v,
            [models[modelName].primaryKeyAttribute]: this[models[modelName].primaryKeyAttribute],
          })),
          options,
        )
      }
    })
  }
})

const ctx = createContext(sequelize)
module.exports = { ...models, sequelize, Sequelize, ctx }
export default module.exports
