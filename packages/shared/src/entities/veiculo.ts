import * as z from 'zod/v4';
import { auditSchema } from '../audit_schema';

export namespace Veiculos {
  export const schema = auditSchema.extend({
    placa: z.string().trim().regex(
      /^(?:[A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/,
      'Placa inválida'
    ),
    modelo: z.string().trim().min(1),
    ano: z.number().int().min(1900),
    ativo: z.boolean(),
  });

  export type Entity = z.output<typeof schema>;

  export namespace Create {
    export const inputSchema = schema.omit({
      _id: true,
      createdAt: true,
      createdBy: true,
      updatedAt: true,
      updatedBy: true,
      deletedAt: true,
      deletedBy: true,
      deletado: true,
    });

    export const outputSchema = schema;

    export type Input = z.input<typeof inputSchema>;
    export type Output = z.output<typeof outputSchema>;
  }

  export namespace Update {
    export const inputSchema = Create.inputSchema
      .partial()
      .refine(
        (data) => Object.keys(data).length > 0,
        { message: 'Informe ao menos um campo para atualizar' }
      );

    export const outputSchema = schema;

    export type Input = z.input<typeof inputSchema>;
    export type Output = z.output<typeof outputSchema>;
  }

  export namespace Delete {
    export const inputSchema = z.object({
      _id: z.uuid(),
    });

    export const outputSchema = z.object({
      success: z.boolean(),
    });

    export type Input = z.input<typeof inputSchema>;
    export type Output = z.output<typeof outputSchema>;
  }

  export namespace GetAll {
    export const inputSchema = z.void();

    export const outputSchema = z.array(schema);

    export type Input = z.input<typeof inputSchema>;
    export type Output = z.output<typeof outputSchema>;
  }

  export namespace GetById {
    export const inputSchema = z.object({
      _id: z.uuid(),
    });

    export const outputSchema = schema;

    export type Input = z.input<typeof inputSchema>;
    export type Output = z.output<typeof outputSchema>;
  }
}