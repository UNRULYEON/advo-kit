import "dotenv/config";

import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

export const connection = connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

export const db = drizzle(connection);

export default db;