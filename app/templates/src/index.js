import { syncForce, syncModels, port, ip } from 'common/config'
import koa from 'infrastructure/koa'
import container from './container'

const { database } = container.cradle

const startServer = () => {
  const server = koa()
  server.listen(port, ip, () => {
    // eslint-disable-next-line no-console
    console.log('Express server listening on %d, in %s mode', port, process.env.NODE_ENV)
  })
}

database
  .authenticate()
  .then(() => (syncModels ? database.sync({ force: syncForce }) : Promise.resolve()))
  .then(startServer)
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Server failed to start due to error: %s', err)
  })
