import { ConnectOptions } from 'mongoose'
import env from '../utils/env'

interface DatabaseConfig {
  uri: string
  options: ConnectOptions
}

const databaseConfig: DatabaseConfig = {
  uri: env('MONGODB_CONNECTION_URL'),
  options: {},
}

export default databaseConfig
