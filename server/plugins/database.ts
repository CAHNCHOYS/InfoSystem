import mysql2 from "mysql2";
import { PromisePoolConnection } from "mysql2/promise";

let dbPool: PromisePoolConnection;

export default defineNitroPlugin((nitro) => {
  const config = useRuntimeConfig();

  console.log("nitro is running");
  console.log(config, "name2");

  const pool = mysql2.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 100,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
  });

  dbPool = pool.promise();
});

export { dbPool };
