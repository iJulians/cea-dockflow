
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  cadastrosMock,
  type CadastroTipo,
  type Motorista,
  type Veiculo,
  type Transportadora,
  type CentroDistribuicao,
} from '@/mocks/cadastros';

type CadastroState = {
  motoristas: Motorista[];
  veiculos: Veiculo[];
  transportadoras: Transportadora[];
  cds: CentroDistribuicao[];

  adicionar: (
    tipo: CadastroTipo,
    dados: Record<string, string>
  ) => void;

  editar: (
    tipo: CadastroTipo,
    id: string,
    dados: Record<string, string>
  ) => void;

  alternarAtivo: (tipo: CadastroTipo, id: string) => void;
};

export const useCadastrosStore = create<CadastroState>()(
  persist(
    (set) => ({
      ...cadastrosMock,

      adicionar: (tipo, dados) =>
        set((state) => ({
          ...state,
          [tipo]: [
            ...state[tipo],
            {
              ...dados,
              id: crypto.randomUUID(),
              ativo: true,
            },
          ],
        })),

      editar: (tipo, id, dados) =>
        set((state) => ({
          ...state,
          [tipo]: state[tipo].map((registro) =>
            registro.id === id
              ? { ...registro, ...dados }
              : registro
          ),
        })),

      alternarAtivo: (tipo, id) =>
        set((state) => ({
          ...state,
          [tipo]: state[tipo].map((registro) =>
            registro.id === id
              ? { ...registro, ativo: !registro.ativo }
              : registro
          ),
        })),
    }),
    {
      name: 'dockflow-cadastros',
    }
  )
);
