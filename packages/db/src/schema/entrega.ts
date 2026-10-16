
import {
  pgTable,
  uuid,
  varchar,
  jsonb,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';

import { viagem } from './viagem';
import { cd } from './cd';
import { veiculo } from './veiculo';
import { helpers } from './helpers';
import { usuario } from './usuario';

export const entrega = pgTable(
  'entrega',
  {
    id: uuid('id')
      .primaryKey()
      .defaultRandom(),

    id_viagem: uuid('id_viagem')
      .notNull()
      .references(() => viagem.id),

    shipment: jsonb('shipment'),

    viagem: varchar('viagem', {
      length: 100,
    }),

    id_destino: uuid('id_destino')
      .references(() => cd.id),

    id_veiculo: uuid('id_veiculo')
      .references(() => veiculo.id),

    hora_prevista: timestamp('hora_prevista', {
      withTimezone: true,
    }),

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
    index('idx_entrega_viagem')
      .on(table.id_viagem),

    index('idx_entrega_destino')
      .on(table.id_destino),

    index('idx_entrega_status')
      .on(table.status),

    // Índice para consultas por veículo
    index('idx_entrega_veiculo')
      .on(table.id_veiculo),

    // Índices de auditoria
    index('idx_entrega_criado_por')
      .on(table.criado_por),

    index('idx_entrega_atualizado_por')
      .on(table.atualizado_por),

    index('idx_entrega_deletado_por')
      .on(table.deletado_por),
  ],
);
