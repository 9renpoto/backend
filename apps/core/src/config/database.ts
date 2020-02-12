import { join } from 'path'
import { ConnectionOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, '../**/*.entity.[t|j]s')],
  extra: process.env.NODE_ENV === 'production' && {
    socketPath: process.env.DATABASE_HOST
  },
  logging: 'all',
  namingStrategy: new SnakeNamingStrategy()
}

export default config