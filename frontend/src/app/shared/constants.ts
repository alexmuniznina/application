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
