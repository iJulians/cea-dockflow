
import {
  pgTable,
  uuid,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

import { usuario } from './usuario';
import { transportadora } from './transportadora';
import { motorista } from './motorista';
import { cd } from './cd';

export const viagem = pgTable(
  'viagem',
  {
    id: uuid('id')
      .primaryKey()
      .defaultRandom(),

    id_transportadora: uuid('id_transportadora')
      .references(() => transportadora.id),

    id_motorista: uuid('id_motorista')
      .references(() => motorista.id),

    id_origem: uuid('id_origem')
      .references(() => cd.id),

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
    index('idx_viagem_transportadora')
      .on(table.id_transportadora),

    index('idx_viagem_motorista')
      .on(table.id_motorista),

    index('idx_viagem_origem')
      .on(table.id_origem),

    // Índices de auditoria
    index('idx_viagem_criado_por')
      .on(table.criado_por),

    index('idx_viagem_atualizado_por')
      .on(table.atualizado_por),

    index('idx_viagem_deletado_por')
      .on(table.deletado_por),
  ],
);
