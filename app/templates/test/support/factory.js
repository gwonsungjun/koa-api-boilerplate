import path from 'path'
import { factory, SequelizeAdapter } from 'factory-girl'
import models from 'infrastructure/sequelize/models'
import factoriesLoader from './factoriesLoader'

const factoryGirl = new factory.FactoryGirl()
factoryGirl.setAdapter(new SequelizeAdapter())

module.exports = factoriesLoader({
  factoryGirl,
  models,
  baseFolder: path.join(__dirname, 'factories'),
})
