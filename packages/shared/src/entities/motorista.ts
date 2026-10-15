import * as z from 'zod/v4';
import { auditSchema } from '../audit_schema';

export namespace Motorista {
  export const schema = auditSchema.extend({
    nome: z.string().trim().min(1, 'Nome é obrigatório'),
    sobrenome: z.string().trim().min(1, 'Sobrenome é obrigatório'),
    cnh: z.string().trim().regex(/^\d{11}$/, 'CNH inválida'),
    ddd: z.string().trim().regex(/^\d{2}$/, 'DDD inválido'),
    telefone: z.string().trim().regex(/^\d{8,9}$/, 'Telefone inválido'),
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