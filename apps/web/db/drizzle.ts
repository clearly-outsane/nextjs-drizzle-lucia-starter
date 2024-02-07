import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

const userTable = pgTable("user", {
  id: text("id").primaryKey(),
});

const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export { db, sql, adapter };
