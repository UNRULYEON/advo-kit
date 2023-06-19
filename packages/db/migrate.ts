import "dotenv/config";

import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

if (!process.env.DATABASE_URL)
  throw new Error("DATABASE_URL is not set in .env");

// create the connection
const poolConnection = mysql.createPool(process.env.DATABASE_URL || "");

const db = drizzle(poolConnection);

// this will automatically run needed migrations on the database
migrate(db, { migrationsFolder: "../drizzle" })
  .then(() => console.log("🚀 Migrations ran successfully"))
  .catch((err) => {
    console.error("🚨 Migration failed");
    console.error(err);
  });
