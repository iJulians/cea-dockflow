
import {
  pgTable,
  uuid,
  varchar,
  text,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const permission = pgTable(
  'permission',
  {
    id: uuid('id')
      .primaryKey()
      .defaultRandom(),

    recurso: varchar('recurso', {
      length: 80,
    }).notNull(),

    acao: varchar('acao', {
      length: 40,
    }).notNull(),

    descricao: text('descricao'),
  },
  (table) => [
    uniqueIndex('uq_permission_recurso_acao')
      .on(table.recurso, table.acao),
  ],
);
