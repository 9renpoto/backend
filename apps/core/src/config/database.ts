import { registerAs } from "@nestjs/config";
import { join } from "path";
import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port:
    typeof process.env.DATABASE_PORT === "undefined"
      ? 5432
      : Number(process.env.DATABASE_PORT),
  entities: [join(__dirname, "../**/*.entity.[t|j]s")],
  extra: process.env.NODE_ENV === "production" && {
    socketPath: process.env.DATABASE_HOST,
  },
  logging: "all",
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default registerAs("database", () => config);
