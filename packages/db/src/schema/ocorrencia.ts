
import { sql } from 'drizzle-orm';

import {
  pgTable,
  uuid,
  boolean,
  timestamp,
  index,
  check,
} from 'drizzle-orm/pg-core';

import { viagem } from './viagem';
import { entrega } from './entrega';
import { helpers } from './helpers';
import { usuario } from './usuario';

export const ocorrencia = pgTable(
  'ocorrencia',
  {
    id: uuid('id')
      .primaryKey()
      .defaultRandom(),

    id_viagem: uuid('id_viagem')
      .references(() => viagem.id),

    id_entrega: uuid('id_entrega')
      .references(() => entrega.id),

    status: uuid('status')
      .references(() => helpers.id),

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
    // Índices operacionais
    index('idx_ocorrencia_viagem')
      .on(table.id_viagem),

    index('idx_ocorrencia_entrega')
      .on(table.id_entrega),

    index('idx_ocorrencia_status')
      .on(table.status),

    // Índices de auditoria
    index('idx_ocorrencia_criado_por')
      .on(table.criado_por),

    index('idx_ocorrencia_atualizado_por')
      .on(table.atualizado_por),

    index('idx_ocorrencia_deletado_por')
      .on(table.deletado_por),

    // Exatamente uma referência obrigatória
    check(
      'chk_ocorrencia_referencia',
      sql`
        num_nonnulls(
          ${table.id_viagem},
          ${table.id_entrega}
        ) = 1
      `,
    ),
  ],
);
