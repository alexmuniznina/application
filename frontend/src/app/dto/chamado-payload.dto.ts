export type ChamadoPayload = {
  usuario_id: number;
  empresa_id: number;
  endereco?: string;
  servicos?: string[];
  equipamentos_id?: number[];
  sintomas?: string;
};
