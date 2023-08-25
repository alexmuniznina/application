export type Chamado = {
  id: number;
  usuarioId: number;
  empresaId: number;
  endereco: string;
  servicos?: string[];
  equipamentos?: string[];
  criadoEm: string;
  status: string;
  sintomas?: string;
  avaliacao?: number;
};
