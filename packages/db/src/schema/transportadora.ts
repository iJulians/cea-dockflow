
import {
  pgTable,
  uuid,
  varchar,
  jsonb,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

import { usuario } from './usuario';

export const transportadora = pgTable(
  'transportadora',
  {
    id: uuid('id')
      .primaryKey()
      .defaultRandom(),

    nome: varchar('nome', { length: 150 })
      .notNull(),

    contato: jsonb('contato'),

    criado_em: timestamp('criado_em', {
      withTimezone: true,
    }).defaultNow(),

    criado_por: uuid('criado_por')
      .references(() => usuario.id),

    atualizado_em: timestamp('atualizado_em', {
      withTimezone: true,
    }),

    atualizado_por: uuid('atualizado_por')
      .references(() => usuario.id),

    deletado_em: timestamp('deletado_em', {
      withTimezone: true,
    }),

    deletado_por: uuid('deletado_por')
      .references(() => usuario.id),

    deletado: boolean('deletado')
      .notNull()
      .default(false),
  },
  (table) => [
    index('idx_transportadora_criado_por')
      .on(table.criado_por),

    index('idx_transportadora_atualizado_por')
      .on(table.atualizado_por),

    index('idx_transportadora_deletado_por')
      .on(table.deletado_por),
  ],
);
