
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  ocorrenciasMock,
  type Ocorrencia,
  type OcorrenciaItem,
  type OcorrenciaStatus,
} from '@/mocks/ocorrencias';

type NovaOcorrencia = Pick<
  Ocorrencia,
  'viagemId' | 'entregaId' | 'titulo' | 'descricao'
>;

interface OcorrenciasStore {
  ocorrencias: Ocorrencia[];
  adicionarOcorrencia: (dados: NovaOcorrencia) => void;
  atualizarStatus: (
    id: string,
    status: OcorrenciaStatus
  ) => void;
  adicionarFollowup: (
    ocorrenciaId: string,
    mensagem: string
  ) => void;
  adicionarItem: (
    ocorrenciaId: string,
    item: Omit<OcorrenciaItem, 'id' | 'finalizado'>
  ) => void;
  alternarItem: (
    ocorrenciaId: string,
    itemId: string
  ) => void;
}

export const useOcorrenciasStore = create<OcorrenciasStore>()(
  persist(
    (set) => ({
      ocorrencias: ocorrenciasMock,

      adicionarOcorrencia: (dados) =>
        set((state) => {
          const numero =
            Math.max(
              0,
              ...state.ocorrencias.map(
                (o) => Number(o.codigo.replace('OC-', '')) || 0
              )
            ) + 1;

          const nova: Ocorrencia = {
            ...dados,
            id: crypto.randomUUID(),
            codigo: `OC-${String(numero).padStart(3, '0')}`,
            status: 'ABERTA',
            criadoEm: new Date().toISOString(),
            itens: [],
            followups: [],
          };

          return {
            ocorrencias: [nova, ...state.ocorrencias],
          };
        }),

      atualizarStatus: (id, status) =>
        set((state) => ({
          ocorrencias: state.ocorrencias.map((o) =>
            o.id === id ? { ...o, status } : o
          ),
        })),

      adicionarFollowup: (ocorrenciaId, mensagem) =>
        set((state) => ({
          ocorrencias: state.ocorrencias.map((o) =>
            o.id === ocorrenciaId
              ? {
                  ...o,
                  followups: [
                    ...o.followups,
                    {
                      id: crypto.randomUUID(),
                      mensagem,
                      criadoEm: new Date().toISOString(),
                      usuario: 'Operador DockFlow',
                    },
                  ],
                }
              : o
          ),
        })),

      adicionarItem: (ocorrenciaId, item) =>
        set((state) => ({
          ocorrencias: state.ocorrencias.map((o) =>
            o.id === ocorrenciaId
              ? {
                  ...o,
                  itens: [
                    ...o.itens,
                    {
                      ...item,
                      id: crypto.randomUUID(),
                      finalizado: false,
                    },
                  ],
                }
              : o
          ),
        })),

      alternarItem: (ocorrenciaId, itemId) =>
        set((state) => ({
          ocorrencias: state.ocorrencias.map((o) =>
            o.id === ocorrenciaId
              ? {
                  ...o,
                  itens: o.itens.map((item) =>
                    item.id === itemId
                      ? { ...item, finalizado: !item.finalizado }
                      : item
                  ),
                }
              : o
          ),
        })),
    }),
    {
      name: 'dockflow-ocorrencias',
    }
  )
);
