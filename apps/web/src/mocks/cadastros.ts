
export interface Motorista {
  id: string;
  nome: string;
  ddd: string;
  telefone: string;
  ativo: boolean;
}

export interface Veiculo {
  id: string;
  placa: string;
  tipo: string;
  ativo: boolean;
}

export interface Transportadora {
  id: string;
  nome: string;
  contato: string;
  ativo: boolean;
}

export interface CentroDistribuicao {
  id: string;
  nome: string;
  ativo: boolean;
}

export type CadastroTipo =
  | 'motoristas'
  | 'veiculos'
  | 'transportadoras'
  | 'cds';

export type CadastroMap = {
  motoristas: Motorista;
  veiculos: Veiculo;
  transportadoras: Transportadora;
  cds: CentroDistribuicao;
};

export const cadastrosMock: {
  [K in CadastroTipo]: CadastroMap[K][];
} = {
  motoristas: [
    {
      id: 'm1',
      nome: 'Carlos Silva',
      ddd: '47',
      telefone: '999887766',
      ativo: true,
    },
    {
      id: 'm2',
      nome: 'Roberto Santos',
      ddd: '47',
      telefone: '988776655',
      ativo: true,
    },
    {
      id: 'm3',
      nome: 'Marcos Oliveira',
      ddd: '48',
      telefone: '999665544',
      ativo: true,
    },
  ],
  veiculos: [
    { id: 'v1', placa: 'ABC1D23', tipo: 'Carreta', ativo: true },
    { id: 'v2', placa: 'DEF4G56', tipo: 'Truck', ativo: true },
    { id: 'v3', placa: 'GHI7J89', tipo: 'Carreta', ativo: true },
  ],
  transportadoras: [
    {
      id: 't1',
      nome: 'Translog',
      contato: '(47) 99988-7766',
      ativo: true,
    },
    {
      id: 't2',
      nome: 'Expresso Sul',
      contato: '(47) 98877-6655',
      ativo: true,
    },
    {
      id: 't3',
      nome: 'Rodonaves',
      contato: '(48) 99966-5544',
      ativo: true,
    },
  ],
  cds: [
    { id: 'cd1', nome: 'CD Navegantes', ativo: true },
    { id: 'cd2', nome: 'CD Itajaí', ativo: true },
    { id: 'cd3', nome: 'CD Curitiba', ativo: true },
    { id: 'cd4', nome: 'CD Joinville', ativo: true },
    { id: 'cd5', nome: 'CD Florianópolis', ativo: true },
  ],
};
