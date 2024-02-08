import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import * as schema from "./schema";

console.log("DATABASE_URL", process.env.DATABASE_URL);

const sql = neon(process.env.DATABASE_URL as string);
const db = drizzle(sql, { schema });

const adapter = new DrizzlePostgreSQLAdapter(
  db,
  schema.sessionTable,
  schema.userTable
);

export { db, sql, adapter };
