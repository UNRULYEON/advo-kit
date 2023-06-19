import "dotenv/config";

import type { Config } from "drizzle-kit";

export default {
  schema: "./schema/*",
  out: "./drizzle",
  connectionString: process.env.DATABASE_URL,
} satisfies Config;
