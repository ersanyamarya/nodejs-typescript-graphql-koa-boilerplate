import env from '../utils/env'

export default {
  name: env('APPLICATION_NAME'),
  branch: env('BRANCH_NAME'),
  hostedZone: {
    protocol: env('HOSTED_ZONE_PROTOCOL', 'https'),
    name: env('HOSTED_ZONE_NAME'),
  },
}
