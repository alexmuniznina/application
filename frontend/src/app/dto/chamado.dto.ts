export type Chamado = {
  id: number;
  id_usuario: number;
  id_empresa: number;
  endereco: string;
  servicos: string[];
  equipamentos: string[];
  criadoEm: string;
  status: string;
  sintomas: string;
};
