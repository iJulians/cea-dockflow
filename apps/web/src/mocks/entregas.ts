
export type EntregaStatus =
  | 'PENDENTE'
  | 'EM_CARREGAMENTO'
  | 'EM_TRANSITO'
  | 'ENTREGUE'
  | 'CANCELADA';

export interface EventoEntrega {
  id: string;
  status: EntregaStatus;
  descricao: string;
  dataHora: string;
  usuario: string;
}

export interface Entrega {
  id: string;
  codigo: string;
  viagemId: string;
  shipment: string;
  destino: string;
  previsao: string;
  status: EntregaStatus;
  eventos: EventoEntrega[];
}

export const entregasMock: Entrega[] = [
  {
    id: 'e1',
    codigo: 'ENT-001',
    viagemId: '1',
    shipment: 'SHP-2026001',
    destino: 'CD Curitiba',
    previsao: '2026-10-16T14:00',
    status: 'EM_TRANSITO',
    eventos: [
      {
        id: 'ev1',
        status: 'PENDENTE',
        descricao: 'Entrega cadastrada no sistema',
        dataHora: '2026-10-15T08:00',
        usuario: 'Operador DockFlow',
      },
      {
        id: 'ev2',
        status: 'EM_TRANSITO',
        descricao: 'Veículo saiu do centro de distribuição',
        dataHora: '2026-10-15T10:30',
        usuario: 'Operador DockFlow',
      },
    ],
  },
  {
    id: 'e2',
    codigo: 'ENT-002',
    viagemId: '1',
    shipment: 'SHP-2026002',
    destino: 'CD Joinville',
    previsao: '2026-10-16T11:00',
    status: 'PENDENTE',
    eventos: [],
  },
  {
    id: 'e3',
    codigo: 'ENT-003',
    viagemId: '2',
    shipment: 'SHP-2026003',
    destino: 'CD Florianópolis',
    previsao: '2026-10-16T16:00',
    status: 'EM_CARREGAMENTO',
    eventos: [],
  },
  {
    id: 'e4',
    codigo: 'ENT-004',
    viagemId: '3',
    shipment: 'SHP-2026004',
    destino: 'CD Blumenau',
    previsao: '2026-10-15T18:00',
    status: 'ENTREGUE',
    eventos: [],
  },
];
