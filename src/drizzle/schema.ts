import { InferInsertModel } from "drizzle-orm";
import { uniqueIndex } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable, serial } from "drizzle-orm/pg-core";

export const users = pgTable(
    'users',
    {
        id: serial('id').primaryKey(),
        name: text('name').notNull(),
        email: text('name').unique().notNull(),
        password: text('password').notNull()
    },
    (users) => ({
        uniqueIdx: uniqueIndex('unique_idx').on(users.email)
    })
)

export type NewUser = InferInsertModel<typeof users>;