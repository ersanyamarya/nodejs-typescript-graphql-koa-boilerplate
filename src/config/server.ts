import env from '../utils/env'

export default {
  appName: env('APPLICATION_NAME'),
  hostname: env('HOSTNAME'),
  port: Number.parseInt(env('CONTAINER_PORT', '3000')),

  healthPath: `${env('HEALTH_CHECK_PATH', '/health')}`,

  log: {
    level: env('LOG_LEVEL', 'info'),
  },

  env: {
    current: env('NODE_ENV'),
    is: {
      dev: env('NODE_ENV') !== 'production',
      prod: env('NODE_ENV') === 'production',
    },
  },
}
