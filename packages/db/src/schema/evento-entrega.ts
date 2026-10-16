
import {
  pgTable,
  uuid,
  timestamp,
  text,
  index,
} from 'drizzle-orm/pg-core';

import { entrega } from './entrega';
import { helpers } from './helpers';
import { usuario } from './usuario';

export const eventoEntrega = pgTable(
  'evento_entrega',
  {
    id: uuid('id')
      .primaryKey()
      .defaultRandom(),

    id_entrega: uuid('id_entrega')
      .notNull()
      .references(() => entrega.id),

    data_hora_evento: timestamp('data_hora_evento', {
      withTimezone: true,
    }).notNull(),

    id_status: uuid('id_status')
      .notNull()
      .references(() => helpers.id),

    id_categoria: uuid('id_categoria')
      .references(() => helpers.id),

    observacao: text('observacao'),

    criado_em: timestamp('criado_em', {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    criado_por: uuid('criado_por')
      .references(() => usuario.id),
  },
  (table) => [
    // Histórico cronológico da entrega
    index('idx_evento_entrega_timeline')
      .on(
        table.id_entrega,
        table.data_hora_evento,
      ),

    // Consultas por status e categoria
    index('idx_evento_entrega_status')
      .on(table.id_status),

    index('idx_evento_entrega_categoria')
      .on(table.id_categoria),
  ],
);
