
import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

import { ocorrencia } from './ocorrencia';
import { helpers } from './helpers';
import { usuario } from './usuario';

export const ocorrenciaItem = pgTable(
  'ocorrencia_item',
  {
    id: uuid('id')
      .primaryKey()
      .defaultRandom(),

    id_ocorrencia: uuid('id_ocorrencia')
      .notNull()
      .references(() => ocorrencia.id),

    volume: varchar('volume', {
      length: 100,
    }),

    item: varchar('item', {
      length: 100,
    }),

    categoria: uuid('categoria')
      .references(() => helpers.id),

    descricao: text('descricao'),

    status: uuid('status')
      .references(() => helpers.id),

    criadoEm: timestamp('criado_em', {
      withTimezone: true,
    }).defaultNow(),

    criadoPor: uuid('criado_por')
      .references(() => usuario.id),

    atualizadoEm: timestamp('atualizado_em', {
      withTimezone: true,
    }),

    atualizadoPor: uuid('atualizado_por')
      .references(() => usuario.id),

    deletadoEm: timestamp('deletado_em', {
      withTimezone: true,
    }),

    deletadoPor: uuid('deletado_por')
      .references(() => usuario.id),

    deletado: boolean('deletado')
      .notNull()
      .default(false),

    finalizadoEm: timestamp('finalizado_em', {
      withTimezone: true,
    }),

    finalizadoPor: uuid('finalizado_por')
      .references(() => usuario.id),
  },
  (table) => [
    // Índices operacionais
    index('idx_ocorrencia_item_ocorrencia')
      .on(table.id_ocorrencia),

    index('idx_ocorrencia_item_categoria')
      .on(table.categoria),

    index('idx_ocorrencia_item_status')
      .on(table.status),

    // Índice de finalização
    index('idx_ocorrencia_item_finalizado_por')
      .on(table.finalizadoPor),

    // Índices de auditoria
    index('idx_ocorrencia_item_criado_por')
      .on(table.criadoPor),

    index('idx_ocorrencia_item_atualizado_por')
      .on(table.atualizadoPor),

    index('idx_ocorrencia_item_deletado_por')
      .on(table.deletadoPor),
  ],
);
