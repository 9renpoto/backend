import { Connection, createConnection } from "typeorm";
import { initialiseTestTransactions } from "typeorm-test-transactions";
import { config } from "../config/database";
import { User } from "../user/user.entity";

initialiseTestTransactions();

const entities = [User];

function createBDConnection() {
  return createConnection({
    ...{
      ...config,
      logging: false,
    },
    entities,
  });
}

async function cleanDB(connection: Connection) {
  return connection.transaction((manager) =>
    Promise.all(
      entities.map(async (entity) => {
        try {
          const repo = await manager.getRepository(entity);
          return repo.query(`DELETE FROM ${repo.metadata.tableName};`);
        } catch (err) {
          await connection.close();
          throw new Error(`ERROR: Cleaning test db: ${err}`);
        }
      })
    )
  );
}

let connection: Connection;
beforeAll(async () => {
  connection = await createBDConnection();
});
afterAll(() => connection.close());
afterEach(() => cleanDB(connection));
