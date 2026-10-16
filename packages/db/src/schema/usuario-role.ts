
import { sql } from 'drizzle-orm';
import {
  pgTable,
  pgEnum,
  uuid,
  boolean,
  timestamp,
  index,
  uniqueIndex,
  check,
} from 'drizzle-orm/pg-core';

import { usuario } from './usuario';
import { role } from './role';
import { cd } from './cd';
import { transportadora } from './transportadora';

export const escopoTipoEnum = pgEnum('escopo_tipo_enum', [
  'GLOBAL',
  'CD',
  'TRANSPORTADORA',
]);

export const usuarioRole = pgTable(
  'usuario_role',
  {
    id: uuid('id')
      .primaryKey()
      .defaultRandom(),

    id_usuario: uuid('id_usuario')
      .notNull()
      .references(() => usuario.id),

    id_role: uuid('id_role')
      .notNull()
      .references(() => role.id),

    escopoTipo: escopoTipoEnum('escopo_tipo')
      .notNull(),

    id_cd: uuid('id_cd')
      .references(() => cd.id),

    id_transportadora: uuid('id_transportadora')
      .references(() => transportadora.id),

    ativo: boolean('ativo')
      .notNull()
      .default(true),

    criado_em: timestamp('criado_em', {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    criado_por: uuid('criado_por')
      .references(() => usuario.id),
  },
  (table) => [
    // Índices para consultas e relacionamentos
    index('idx_usuario_role_usuario')
      .on(table.id_usuario),

    index('idx_usuario_role_role')
      .on(table.id_role),

    index('idx_usuario_role_cd')
      .on(table.id_cd),

    index('idx_usuario_role_transportadora')
      .on(table.id_transportadora),

    // Validação de escopos
    check(
      'chk_usuario_role_escopo',
      sql`
        (
          ${table.escopoTipo} = 'GLOBAL'
          AND ${table.id_cd} IS NULL
          AND ${table.id_transportadora} IS NULL
        )
        OR
        (
          ${table.escopoTipo} = 'CD'
          AND ${table.id_cd} IS NOT NULL
          AND ${table.id_transportadora} IS NULL
        )
        OR
        (
          ${table.escopoTipo} = 'TRANSPORTADORA'
          AND ${table.id_cd} IS NULL
          AND ${table.id_transportadora} IS NOT NULL
        )
      `,
    ),

    // Uma role GLOBAL por usuário
    uniqueIndex('uq_usuario_role_global')
      .on(table.id_usuario, table.id_role)
      .where(
        sql`${table.escopoTipo} = 'GLOBAL'`,
      ),

    // Uma role por usuário em cada CD
    uniqueIndex('uq_usuario_role_cd')
      .on(table.id_usuario, table.id_role, table.id_cd)
      .where(
        sql`${table.escopoTipo} = 'CD'`,
      ),

    // Uma role por usuário em cada transportadora
    uniqueIndex('uq_usuario_role_transportadora')
      .on(
        table.id_usuario,
        table.id_role,
        table.id_transportadora,
      )
      .where(
        sql`${table.escopoTipo} = 'TRANSPORTADORA'`,
      ),
  ],
);
