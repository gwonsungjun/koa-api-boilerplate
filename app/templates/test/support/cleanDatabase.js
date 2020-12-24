import { database } from 'infrastructure/sequelize/models'

module.exports = () => database.truncate({ cascade: true, force: true })
