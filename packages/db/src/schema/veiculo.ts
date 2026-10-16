
import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

import { usuario } from './usuario';

export const veiculo = pgTable(
  'veiculo',
  {
    id: uuid('id')
      .primaryKey()
      .defaultRandom(),

    placa: varchar('placa', { length: 7 })
      .notNull()
      .unique(),

    tipo: varchar('tipo', { length: 80 }),

    criado_em: timestamp('criado_em', {
      withTimezone: true,
    }).defaultNow(),

    criadoPor: uuid('criado_por')
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
    index('idx_veiculo_criado_por')
      .on(table.criadoPor),

    index('idx_veiculo_atualizado_por')
      .on(table.atualizado_por),

    index('idx_veiculo_deletado_por')
      .on(table.deletado_por),
  ],
);
