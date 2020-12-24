import { database } from 'infrastructure/sequelize/models'
import { syncModels, syncForce } from 'common/config'

export default async function () {
  await database.authenticate()
  if (syncModels && syncForce) {
    await database.sync({ force: syncForce })
  }
  global.__sequelize__ = database
}
