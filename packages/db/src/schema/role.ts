
import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
} from 'drizzle-orm/pg-core';

export const role = pgTable('role', {
  id: uuid('id')
    .primaryKey()
    .defaultRandom(),

  codigo: varchar('codigo', {
    length: 60,
  })
    .notNull()
    .unique(),

  nome: varchar('nome', {
    length: 100,
  })
    .notNull(),

  descricao: text('descricao'),

  ativo: boolean('ativo')
    .notNull()
    .default(true),
});
