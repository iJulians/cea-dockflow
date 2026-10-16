
import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const usuario = pgTable('usuario', {
  id: uuid('id')
    .primaryKey()
    .defaultRandom(),

  username: varchar('username', {
    length: 100,
  })
    .notNull()
    .unique(),

  email: varchar('email', {
    length: 255,
  }).unique(),

  senha_hash: text('senha_hash'),

  ativo: boolean('ativo')
    .notNull()
    .default(true),

  criado_em: timestamp('criado_em', {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});
