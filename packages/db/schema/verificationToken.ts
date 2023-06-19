import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";
import { InferModel } from "drizzle-orm";

export const VerificationToken = mysqlTable("VerificationToken", {
  identifier: varchar("identifier", { length: 256 }),
  token: varchar("token", { length: 256 }),
  expires: timestamp("expires"),
});

export type VerificationToken = InferModel<typeof VerificationToken>;
export type NewVerificationToken = InferModel<
  typeof VerificationToken,
  "insert"
>;
