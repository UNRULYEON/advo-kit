import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { InferModel } from "drizzle-orm";

export const verificationTokens = mysqlTable("verificationTokens", {
  id: varchar("cuid", { length: 256 }).primaryKey(),
  identifier: text("identifier"),
  token: text("token"),
  expires: timestamp("expires"),
});

export type VerificationToken = InferModel<typeof verificationTokens>;
export type NewVerificationToken = InferModel<
  typeof verificationTokens,
  "insert"
>;
