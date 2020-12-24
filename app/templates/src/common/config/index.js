import path from 'path'
import merge from 'lodash/merge'
import dotEnv from 'dotenv-safe'

/* istanbul ignore next */
const requireProcessEnv = name => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${  name  } environment variable`)
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  dotEnv.config({
    path: path.join(__dirname, '../../../.env'),
    sample: path.join(__dirname, '../../../.env.example'),
    allowEmptyValues: true,
  })
}

const index = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    syncModels: process.env.SYNC_MODELS || false,
    syncForce: process.env.SYNC_FORCE || false,
    db: {
      options: {
        dialect: 'mysql',
        timezone: '+09:00',
        logging: false,
        benchmark: false,
        retry: {
          match: [/SequelizeConnectionError/],
          max: 2,
        },
      },
    },
  },
  test: {
    syncModels: true,
    syncForce: true,
    db: {
      uri: requireProcessEnv('DB_TEST_URI'),
    },
  },
  development: {
    syncModels: true,
    syncForce: true,
    db: {
      uri: requireProcessEnv('DB_TEST_URI'),
    },
    /*
    db: {
      options: {
        replication: JSON.parse(requireProcessEnv('DB_REPLICATION')),
      },
    },
     */
  },
  production: {
    db: {
      options: {
        replication: JSON.parse(requireProcessEnv('DB_REPLICATION')),
      },
    },
  },
}

module.exports = merge(index.all, index[index.all.env])
export default module.exports
