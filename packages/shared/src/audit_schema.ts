import * as z from 'zod/v4';

export const auditSchema = z.object({
  _id: z.uuid(),

  createdAt: z.iso.datetime(),
  createdBy: z.uuid(),

  updatedAt: z.iso.datetime().nullable(),
  updatedBy: z.uuid().nullable(),

  deletedAt: z.iso.datetime().nullable(),
  deletedBy: z.uuid().nullable(),

  deletado: z.boolean(),
});

export type Audit = z.infer<typeof auditSchema>;