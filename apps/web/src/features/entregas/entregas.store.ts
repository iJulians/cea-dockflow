
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  entregasMock,
  type Entrega,
  type EntregaStatus,
} from '@/mocks/entregas';

interface EntregasStore {
  entregas: Entrega[];

  atualizarStatus: (
    id: string,
    status: EntregaStatus,
    descricao: string
  ) => void;

  adicionarEvento: (
    id: string,
    descricao: string
  ) => void;
}

export const useEntregasStore = create<EntregasStore>()(
  persist(
    (set) => ({
      entregas: entregasMock,

      atualizarStatus: (id, status, descricao) =>
        set((state) => ({
          entregas: state.entregas.map((entrega) => {
            if (entrega.id !== id) return entrega;

            return {
              ...entrega,
              status,
              eventos: [
                ...entrega.eventos,
                {
                  id: crypto.randomUUID(),
                  status,
                  descricao:
                    descricao.trim() || 'Status atualizado',
                  dataHora: new Date().toISOString(),
                  usuario: 'Operador DockFlow',
                },
              ],
            };
          }),
        })),

      adicionarEvento: (id, descricao) =>
        set((state) => ({
          entregas: state.entregas.map((entrega) => {
            if (entrega.id !== id) return entrega;

            return {
              ...entrega,
              eventos: [
                ...entrega.eventos,
                {
                  id: crypto.randomUUID(),
                  status: entrega.status,
                  descricao,
                  dataHora: new Date().toISOString(),
                  usuario: 'Operador DockFlow',
                },
              ],
            };
          }),
        })),
    }),
    {
      name: 'dockflow-entregas',
    }
  )
);
