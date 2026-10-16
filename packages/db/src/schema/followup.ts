
import { sql } from 'drizzle-orm';

import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  index,
  check,
} from 'drizzle-orm/pg-core';

import { usuario } from './usuario';

export const followup = pgTable(
  'followup',
  {
    id: uuid('id')
      .primaryKey()
      .defaultRandom(),

    id_externo: text('id_externo')
      .notNull(),

    mensagem: text('mensagem')
      .notNull(),

    criado_em: timestamp('criado_em', {
      withTimezone: true,
    }).defaultNow(),

    criado_por: uuid('criado_por')
      .references(() => usuario.id),

    deletado_em: timestamp('deletado_em', {
      withTimezone: true,
    }),

    deletado: boolean('deletado')
      .notNull()
      .default(false),
  },
);
