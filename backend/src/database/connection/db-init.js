const db = require("./connect");
const json = require("../json/db.json");

async function init() {
  const conn = await db.rootConnection();
  conn
    .query(
      'SELECT table_name FROM information_schema.tables WHERE table_name = "usuarios"'
    )
    .then((result) => {
      if (!result[0].length) {
        Object.keys(json).forEach((key) => {
          switch (key) {
            case "usuarios":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS usuarios (
                      id INT AUTO_INCREMENT PRIMARY KEY, 
                      cpf VARCHAR(14) NOT NULL, 
                      nome VARCHAR(255) NOT NULL, 
                      endereco VARCHAR(255),
                      complemento VARCHAR(100),
                      bairro VARCHAR(100),
                      cidade VARCHAR(100),
                      estado ENUM("AC", "AL", "AP", "AM", "BA", "CE", "ES", "GO", "MA", "MT", "MG", "MS", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"),
                      cep CHAR(9),
                      celular_1 VARCHAR(15) NOT NULL,
                      celular_2 VARCHAR(15),
                      telefone_1 VARCHAR(15),
                      telefone_2 VARCHAR(15),
                      email VARCHAR(50) NOT NULL, 
                      senha VARCHAR(20) NOT NULL, 
                      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL
                            )`
                )
                .then(() => {
                  json[key].forEach((item) => {
                    conn.query(
                      `INSERT INTO usuarios (cpf, nome, endereco, complemento, bairro, cidade, estado, cep, celular_1, celular_2, telefone_1, telefone_2, email, senha)
                        VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                      [
                        item.cpf,
                        item.nome,
                        item.endereco,
                        item.complemento,
                        item.bairro,
                        item.cidade,
                        item.estado,
                        item.cep,
                        item.celular_1,
                        item.celular_2,
                        item.telefone_1,
                        item.telefone_2,
                        item.email,
                        item.senha,
                      ]
                    );
                  });
                })
                .catch((err) => {
                  throw new Error(err.message);
                });
              break;
            case "empresas":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS empresas (
                      id INT AUTO_INCREMENT PRIMARY KEY, 
                      cnpj VARCHAR(18) NOT NULL,
                      celular_1 VARCHAR(15) NOT NULL,
                      celular_2 VARCHAR(15),
                      telefone_1 VARCHAR(15),
                      telefone_2 VARCHAR(15), 
                      nome_fantasia VARCHAR(255) NOT NULL, 
                      email VARCHAR(50) NOT NULL, 
                      endereco VARCHAR(255),
                      descricao_curta VARCHAR(255),
                      sobre_nos TEXT,
                      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
                            )`
                )
                .then(() => {
                  json[key].forEach((item) => {
                    conn.query(
                      `INSERT INTO empresas (cnpj, celular_1, celular_2, telefone_1, telefone_2, nome_fantasia, email, endereco, descricao_curta, sobre_nos)
                        VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                      [
                        item.cnpj,
                        item.celular_1,
                        item.celular_2,
                        item.telefone_1,
                        item.telefone_2,
                        item.nome_fantasia,
                        item.email,
                        item.endereco,
                        item.descricao_curta,
                        item.sobre_nos,
                      ]
                    );
                  });
                })
                .catch((err) => {
                  throw err;
                });
              break;
            case "servicos":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS servicos (
                      id INT AUTO_INCREMENT PRIMARY KEY, 
                      tipo ENUM("LIMPEZA", "CONSERTO", "INSTALACAO", "ELETRICA") NOT NULL,
                      empresa_id INT NOT NULL,
                      descricao VARCHAR(255) NOT NULL,
                      valor DECIMAL(10,2),
                      tempo_execucao VARCHAR(30),
                      FOREIGN KEY (empresa_id) REFERENCES empresas(id)
                      )`
                )
                .then(() => {
                  json[key].forEach((item) => {
                    conn.query(
                      `INSERT INTO servicos (tipo, empresa_id, descricao, valor, tempo_execucao)
                        VALUE (?, ?, ?, ?, ?)`,
                      [
                        item.tipo,
                        item.empresa_id,
                        item.descricao,
                        item.valor,
                        item.tempo_execucao,
                      ]
                    );
                  });
                })
                .catch((err) => {
                  throw err;
                });
              break;
            case "equipamentos":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS equipamentos (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      usuario_id INT NOT NULL,
                      descricao VARCHAR(255) NOT NULL,
                      marca VARCHAR(50) NOT NULL,
                      btu VARCHAR(6) NOT NULL,
                      comodo VARCHAR(100),
                      volt ENUM("110", "220"),
                      num_serie VARCHAR(50),
                      endereco VARCHAR(255),
                      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
                  )`
                )
                .then(() => {
                  json[key].forEach((item) => {
                    conn.query(
                      `INSERT INTO equipamentos (usuario_id, descricao, num_serie, btu, volt, marca, comodo, endereco)
                        VALUE (?, ?, ?, ?, ?, ?, ?, ?)`,
                      [
                        item.usuario_id,
                        item.descricao,
                        item.num_serie,
                        item.btu,
                        item.volt,
                        item.marca,
                        item.comodo,
                        item.endereco,
                      ]
                    );
                  });
                })
                .catch((err) => {
                  throw err;
                });
              break;
            case "chamados":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS chamados (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      usuario_id INT NOT NULL,
                      empresa_id INT NOT NULL,
                      endereco VARCHAR(255),
                      servicos VARCHAR(255),
                      equipamentos_chamado_id INT,
                      sintomas TEXT,
                      status ENUM("CRIADO", "VISITA", "ORCAMENTO", "EXECUTANDO", "APROVACAO", "FINALIZADO") NOT NULL DEFAULT ("CRIADO"),
                      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                      FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                      FOREIGN KEY (empresa_id) REFERENCES empresas(id),
                      FOREIGN KEY (equipamentos_chamado_id) REFERENCES equipamentos_chamado(id)
                            )`
                )
                .then(() => {
                  json[key].forEach((item) => {
                    conn.query(
                      `INSERT INTO chamados (usuario_id, empresa_id, endereco, servicos, equipamentos_chamado_id, sintomas, status)
                        VALUE (?, ?, ?, ?, ?, ?, ?)`,
                      [
                        item.usuario_id,
                        item.empresa_id,
                        item.endereco,
                        item.servicos,
                        item.equipamentos_chamado_id,
                        item.sintomas,
                        item.status,
                      ]
                    );
                  });
                })
                .catch((err) => {
                  throw err;
                });
              break;
            case "equipamentos_chamado":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS equipamentos_chamado (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                equipamento_id_1 INT,
                                equipamento_id_2 INT,
                                equipamento_id_3 INT,
                                equipamento_id_4 INT,
                                equipamento_id_5 INT,
                                equipamento_id_6 INT,
                                equipamento_id_7 INT,
                                equipamento_id_8 INT,
                                equipamento_id_9 INT,
                                equipamento_id_10 INT
                            )`
                )
                .then(() => {
                  json[key].forEach((item) => {
                    conn.query(
                      `INSERT INTO equipamentos_chamado (equipamento_id_1, equipamento_id_2, equipamento_id_3, equipamento_id_4, equipamento_id_5, equipamento_id_6, equipamento_id_7, equipamento_id_8, equipamento_id_9, equipamento_id_10)
                        VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                      [
                        item.equipamento_id_1,
                        item.equipamento_id_2,
                        item.equipamento_id_3,
                        item.equipamento_id_4,
                        item.equipamento_id_5,
                        item.equipamento_id_6,
                        item.equipamento_id_7,
                        item.equipamento_id_8,
                        item.equipamento_id_9,
                        item.equipamento_id_10,
                      ]
                    );
                  });
                })
                .catch((err) => {
                  throw err;
                });
              break;
            case "enderecos":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS enderecos (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    usuario_id INT NOT NULL,
                    endereco VARCHAR(255) NOT NULL,
                    complemento VARCHAR(100),
                    bairro VARCHAR(100) NOT NULL,
                    cidade VARCHAR(100) NOT NULL,
                    estado ENUM('AC','AL','AP','AM','BA','CE','ES','GO','MA','MT','MG','MS','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO') NOT NULL,
                    cep CHAR(9) NOT NULL,
                    FOREIGN KEY usuario_id(usuario_id) REFERENCES usuarios(id) 
                  )`
                )
                .then()
                .catch((err) => {
                  throw err;
                });
              break;
            case "avaliacao_usuario":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS avaliacao_usuario (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nota INT NOT NULL,
                    comentario TEXT NOT NULL,
                    usuario_id INT NOT NULL,
                    empresa_id INT NOT NULL,
                    chamado_id INT NOT NULL,
                    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    FOREIGN KEY usuario_id(usuario_id) REFERENCES usuarios(id),
                    FOREIGN KEY empresa_id(empresa_id) REFERENCES empresas(id),
                    FOREIGN KEY chamado_id(chamado_id) REFERENCES chamados(id)
                  )`
                )
                .then()
                .catch((err) => {
                  throw err;
                });
              break;
            case "avaliacao_empresa":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS avaliacao_empresa (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nota INT NOT NULL,
                    comentario TEXT NOT NULL,
                    usuario_id INT NOT NULL,
                    empresa_id INT NOT NULL,
                    chamado_id INT NOT NULL,
                    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    FOREIGN KEY usuario_id(usuario_id) REFERENCES usuarios(id),
                    FOREIGN KEY empresa_id(empresa_id) REFERENCES empresas(id),
                    FOREIGN KEY chamado_id(chamado_id) REFERENCES chamados(id)
                  )`
                )
                .then()
                .catch((err) => {
                  throw err;
                });
              break;
            case "servicos_orcamento":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS servicos_orcamento (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    servico_id_1 INT,
                    servico_id_2 INT,
                    servico_id_3 INT,
                    servico_id_4 INT,
                    servico_id_5 INT,
                    servico_id_6 INT,
                    servico_id_7 INT,
                    servico_id_8 INT,
                    servico_id_9 INT,
                    servico_id_10 INT
                  )`
                )
                .then()
                .catch((err) => {
                  throw err;
                });
              break;
            case "mensagens":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS mensagens (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    chamado_id INT NOT NULL,
                    mensagem TEXT NOT NULL,
                    usuario_id INT NOT NULL,
                    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    FOREIGN KEY usuario_id(usuario_id) REFERENCES usuarios(id),
                    FOREIGN KEY chamado_id(chamado_id) REFERENCES chamados(id)
                  )`
                )
                .then()
                .catch((err) => {
                  throw err;
                });
              break;
            case "pecas":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS pecas (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    descricao VARCHAR(255) NOT NULL,
                    unidade VARCHAR(20) NOT NULL,
                    valor DECIMAL(10,2) NOT NULL,
                    empresa_id INT NOT NULL,
                    FOREIGN KEY empresa_id(empresa_id) REFERENCES empresas(id)
                  )`
                )
                .then()
                .catch((err) => {
                  throw err;
                });
              break;
            case "pecas_orcamento":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS pecas_orcamento (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    peca_id_1 INT,
                    peca_id_2 INT,
                    peca_id_3 INT,
                    peca_id_4 INT,
                    peca_id_5 INT,
                    peca_id_6 INT,
                    peca_id_7 INT,
                    peca_id_8 INT,
                    peca_id_9 INT,
                    peca_id_10 INT
                  )`
                )
                .then()
                .catch((err) => {
                  throw err;
                });
              break;
            case "orcamentos":
              conn
                .query(
                  `CREATE TABLE IF NOT EXISTS orcamentos (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      status ENUM('APROVADO', 'REJEITADO', 'ENVIADO') NOT NULL,
                      validade DATE,
                      pecas_orcamento_id INT,
                      servicos_orcamento_id INT,
                      chamado_id INT NOT NULL,
                      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                      FOREIGN KEY pecas_orcamento_id(pecas_orcamento_id) REFERENCES pecas_orcamento(id),
                      FOREIGN KEY servicos_orcamento_id(servicos_orcamento_id) REFERENCES servicos_orcamento(id),
                      FOREIGN KEY chamado_id(chamado_id) REFERENCES chamados(id)
                  )`
                )
                .then()
                .catch((err) => {
                  throw err;
                });
              break;
            default:
              break;
          }
        });
      } else {
        console.log("Banco de dados inicializado!");
      }
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = { init };
