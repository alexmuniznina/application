export const constants = {
  apiUrl: 'http://localhost:3000',
};

export enum statusChamado {
  CRIADO = 'CHAMADO CRIADO',
  VISITA = 'AGUARDANDO VISITA',
  ORCAMENTO = 'ORÇAMENTO ENVIADO',
  EXECUTANDO = 'EM ANDAMENTO',
  APROVACAO = 'AGUARDANDO APROVAÇÃO',
  FINALIZADO = 'CHAMADO FINALIZADO',
}
