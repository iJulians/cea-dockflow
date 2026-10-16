
export type OcorrenciaStatus =
  | 'ABERTA'
  | 'EM_ANALISE'
  | 'RESOLVIDA'
  | 'CANCELADA';

export type OcorrenciaCategoria =
  | 'AVARIA'
  | 'EXTRAVIO'
  | 'ATRASO'
  | 'DIVERGENCIA'
  | 'OUTROS';

export interface OcorrenciaItem {
  id: string;
  volume: string;
  item: string;
  categoria: OcorrenciaCategoria;
  descricao: string;
  finalizado: boolean;
}

export interface Followup {
  id: string;
  mensagem: string;
  criadoEm: string;
  usuario: string;
}

export interface Ocorrencia {
  id: string;
  codigo: string;
  viagemId: string | null;
  entregaId: string | null;
  titulo: string;
  descricao: string;
  status: OcorrenciaStatus;
  criadoEm: string;
  itens: OcorrenciaItem[];
  followups: Followup[];
}

export const ocorrenciasMock: Ocorrencia[] = [
  {
    id: 'oc1',
    codigo: 'OC-001',
    viagemId: null,
    entregaId: 'e1',
    titulo: 'Avaria identificada na descarga',
    descricao: 'Volume com embalagem danificada.',
    status: 'EM_ANALISE',
    criadoEm: '2026-10-15T14:30:00',
    itens: [
      {
        id: 'item1',
        volume: 'VOL-001',
        item: 'SKU-10025',
        categoria: 'AVARIA',
        descricao: 'Caixa amassada',
        finalizado: false,
      },
    ],
    followups: [
      {
        id: 'fu1',
        mensagem: 'Transportadora acionada para análise.',
        criadoEm: '2026-10-15T15:00:00',
        usuario: 'Operador DockFlow',
      },
    ],
  },
  {
    id: 'oc2',
    codigo: 'OC-002',
    viagemId: '2',
    entregaId: null,
    titulo: 'Atraso na saída do veículo',
    descricao: 'Veículo aguardando liberação operacional.',
    status: 'ABERTA',
    criadoEm: '2026-10-16T08:00:00',
    itens: [],
    followups: [],
  },
];
