import "dotenv/config";

import { drizzle as drizzlePS } from "drizzle-orm/planetscale-serverless";
import { drizzle as drizzleLocal } from "drizzle-orm/mysql2";
import { connect } from "@planetscale/database";
import mysql from "mysql2/promise";

export { users } from "./schema/user";
export { decks } from "./schema/deck";
export { cards } from "./schema/card";

if (!process.env.DATABASE_HOST)
  throw new Error("DATABASE_HOST is not set in .env");
if (!process.env.DATABASE_USERNAME)
  throw new Error("DATABASE_USERNAME is not set in .env");
if (!process.env.DATABASE_PASSWORD)
  throw new Error("DATABASE_PASSWORD is not set in .env");
if (!process.env.DATABASE_URL)
  throw new Error("DATABASE_URL is not set in .env");

export const planetscaleConnection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

const localConnection = mysql.createPool(process.env.DATABASE_URL || "");

export const db =
  process.env.NODE_ENV === "production"
    ? drizzlePS(planetscaleConnection)
    : drizzleLocal(localConnection);

export default db;
