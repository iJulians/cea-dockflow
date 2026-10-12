import  * as z  from "zod/v4";

export const veiculoSchema = z.object({
    placa: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
        /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/,
      'Placa inválida',
    ),

    modelo: z
    .enum([
        'CAVALO',
        'CARRETA',
        'ROMEU',
        'JULIETA',
        'TOCO'
    ])
})

export type CreateVeiculoInput = z.input<typeof veiculoSchema>;
export type CreateVeiculoOutput = z.output<typeof veiculoSchema>; 