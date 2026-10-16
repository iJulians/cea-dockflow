
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  viagensMock,
  type Viagem,
  type ViagemStatus,
} from '@/mocks/viagens';

type NovaViagem = Omit<Viagem, 'id' | 'codigo' | 'criadoEm'>;

interface ViagensStore {
  viagens: Viagem[];
  adicionarViagem: (dados: NovaViagem) => void;
  atualizarStatus: (id: string, status: ViagemStatus) => void;
  removerViagem: (id: string) => void;
}

export const useViagensStore = create<ViagensStore>()(
  persist(
    (set) => ({
      viagens: viagensMock,

      adicionarViagem: (dados) =>
        set((state) => {
          const proximoNumero =
            Math.max(
              0,
              ...state.viagens.map((v) =>
                Number(v.codigo.replace('VG-', '')) || 0
              )
            ) + 1;

          const novaViagem: Viagem = {
            ...dados,
            id: crypto.randomUUID(),
            codigo: `VG-${String(proximoNumero).padStart(3, '0')}`,
            criadoEm: new Date().toISOString(),
          };

          return { viagens: [novaViagem, ...state.viagens] };
        }),

      atualizarStatus: (id, status) =>
        set((state) => ({
          viagens: state.viagens.map((viagem) =>
            viagem.id === id ? { ...viagem, status } : viagem
          ),
        })),

      removerViagem: (id) =>
        set((state) => ({
          viagens: state.viagens.filter((v) => v.id !== id),
        })),
    }),
    {
      name: 'dockflow-viagens',
    }
  )
);
