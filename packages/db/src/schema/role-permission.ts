
import {
  pgTable,
  uuid,
  primaryKey,
  index,
} from 'drizzle-orm/pg-core';

import { role } from './role';
import { permission } from './permission';

export const rolePermission = pgTable(
  'role_permission',
  {
    idRole: uuid('id_role')
      .notNull()
      .references(() => role.id),

    idPermission: uuid('id_permission')
      .notNull()
      .references(() => permission.id),
  },
  (table) => [
    // Chave primária composta
    primaryKey({
      name: 'pk_role_permission',
      columns: [
        table.idRole,
        table.idPermission,
      ],
    }),

    // Índice para consultas por permissão
    index('idx_role_permission_permission')
      .on(table.idPermission),
  ],
);
