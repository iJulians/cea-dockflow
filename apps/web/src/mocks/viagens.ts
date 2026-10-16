
export type ViagemStatus =
  | 'AGUARDANDO'
  | 'EM_TRANSITO'
  | 'CONCLUIDA'
  | 'CANCELADA';

export interface Viagem {
  id: string;
  codigo: string;
  motorista: string;
  transportadora: string;
  origem: string;
  destino: string;
  placa: string;
  status: ViagemStatus;
  previsao: string;
  criadoEm: string;
}

export const viagensMock: Viagem[] = [
  {
    id: '1',
    codigo: 'VG-001',
    motorista: 'Carlos Silva',
    transportadora: 'Translog',
    origem: 'CD Navegantes',
    destino: 'CD Curitiba',
    placa: 'ABC1D23',
    status: 'EM_TRANSITO',
    previsao: '2026-10-16T14:00',
    criadoEm: '2026-10-15T08:00',
  },
  {
    id: '2',
    codigo: 'VG-002',
    motorista: 'Roberto Santos',
    transportadora: 'Expresso Sul',
    origem: 'CD Navegantes',
    destino: 'CD Joinville',
    placa: 'DEF4G56',
    status: 'AGUARDANDO',
    previsao: '2026-10-16T16:00',
    criadoEm: '2026-10-15T09:30',
  },
  {
    id: '3',
    codigo: 'VG-003',
    motorista: 'Marcos Oliveira',
    transportadora: 'Rodonaves',
    origem: 'CD Itajaí',
    destino: 'CD Florianópolis',
    placa: 'GHI7J89',
    status: 'CONCLUIDA',
    previsao: '2026-10-15T18:00',
    criadoEm: '2026-10-14T07:00',
  },
];
