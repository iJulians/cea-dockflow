
import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  integer,
  boolean,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const helpers = pgTable(
  'helpers',
  {
    id: uuid('id')
      .primaryKey()
      .defaultRandom(),

    grupo: varchar('grupo', {
      length: 100,
    }).notNull(),

    codigo: varchar('codigo', {
      length: 80,
    }).notNull(),

    descricao: varchar('descricao', {
      length: 255,
    }).notNull(),

    ordem: integer('ordem'),

    ativo: boolean('ativo')
      .notNull()
      .default(true),

    deletado: boolean('deletado')
      .notNull()
      .default(false),
  },
  (table) => [
    // Impede códigos duplicados dentro do mesmo grupo
    uniqueIndex('uq_helpers_grupo_codigo')
      .on(table.grupo, table.codigo),

    // Opcional: consultas por grupo e ordenação
    index('idx_helpers_grupo_ordem')
      .on(table.grupo, table.ordem),
  ],
);
