export const constants = {
  apiUrl: 'http://localhost:3000',
};

export enum STATUS_CHAMADO {
  CRIADO = 'CHAMADO CRIADO',
  VISITA = 'AGUARDANDO VISITA',
  ORCAMENTO = 'ORÇAMENTO ENVIADO',
  EXECUTANDO = 'EM ANDAMENTO',
  APROVACAO = 'AGUARDANDO APROVAÇÃO',
  FINALIZADO = 'CHAMADO FINALIZADO',
}

export enum FABRICANTE {
  CONSUL = 'Consul',
  ELECTROLUX = 'Electrolux',
  MIDEA = 'Midea',
  SAMSUNG = 'Samsung',
  PANASONIC = 'Panasonic',
  SPRINGER = 'Springer',
  HITACHI = 'Hitachi',
}

export enum BTU {
  '7.500' = '7.500',
  '9.000' = '9.000',
  '12.000' = '12.000',
  '14.000' = '14.000',
  '18.000' = '18.000',
  '21.000' = '21.000',
}

export enum VOLT {
  V110 = '110',
  V220 = '220',
}

export enum COMODO {
  SUITE_MASTER = 'Suite Master',
  SUITE = 'Suite',
  QUARTO = 'Quarto',
  VARANDA = 'Varanda',
  SALA = 'Sala',
}

export enum TIPO_SERVICO {
  INSTALACAO = 'Instalação',
  ELETRICA = 'Elétrica',
  LIMPEZA = 'Limpeza',
  CONSERTO = 'Conserto',
}

export enum DIALOG_TYPE {
  CHAMADO = 'chamado',
  EQUIPAMENTO = 'equipamento',
  ATUALIZA_USUARIO = 'atualizaUsuario',
  NOVO_USUARIO = 'novoUsuario',
}

export enum ESTADOS {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MG = 'MG',
  MS = 'MS',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
}
