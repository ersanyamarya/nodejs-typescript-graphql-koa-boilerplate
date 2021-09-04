import env from '../utils/env'

export default {
  hostname: env('HOSTNAME'),
  port: Number.parseInt(env('APPLICATION_PORT')),
  healthPath: `${env('HEALTH_CHECK_PATH')}`,
  log: {
    level: env('LOG_LEVEL') || 'info',
  },
  env: {
    current: env('NODE_ENV'),
    is: {
      dev: env('NODE_ENV') !== 'production',
      prod: env('NODE_ENV') === 'production',
    },
  },
}
