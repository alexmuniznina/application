export type Chamado = {
  id: number;
  usuario_id: number;
  empresa_id: number;
  endereco?: string;
  servicos?: string;
  equipamentos_chamado_id?: number;
  sintomas?: string;
  status: string;
  criado_em: string;
};
