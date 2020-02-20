import { getRepository, Connection, createConnection } from 'typeorm'
import { initialiseTestTransactions } from 'typeorm-test-transactions'
import { config } from '../config/database'
import { User } from '../user/user.entity'

initialiseTestTransactions()

const entities = [User]

function createBDConnection() {
  // eslint-disable-next-line no-console
  console.warn(config)
  return createConnection({
    ...{
      ...config,
      logging: false
    },
    entities
  })
}

async function cleanDB(connection: Connection) {
  try {
    for (const entity of entities) {
      const repo = await getRepository(entity)
      await repo.query(`DELETE FROM ${repo.metadata.tableName};`)
    }
  } catch (err) {
    connection.close()
    throw new Error(`ERROR: Cleaning test db: ${err}`)
  }
}

let connection: Connection
beforeAll(async () => {
  connection = await createBDConnection()
})
afterAll(() => connection.close())
afterEach(() => cleanDB(connection))
