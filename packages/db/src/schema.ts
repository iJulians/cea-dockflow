import {
    pgTable,
    uuid,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";

export const veiculos = pgTable("veiculos", {
    id: uuid("id").primaryKey().defaultRandom(),
    placa: varchar("placa", { length: 7 }).notNull().unique(),
    modelo: varchar("modelo", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

