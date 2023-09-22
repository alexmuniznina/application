export type Empresa = {
  id: number;
  cnpj: string;
  celular_1: string;
  celular_2?: string;
  telefone_1?: string;
  telefone_2?: string;
  nome_fantasia: string;
  email: string;
  endereco?: string;
  descricao_curta?: string;
  sobre_nos?: string;
  criado_em: string;
};
