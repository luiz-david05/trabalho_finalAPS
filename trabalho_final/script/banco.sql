CREATE TABLE atendente (
    id_atendente SERIAL PRIMARY KEY,
    nome_atendente VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE pizza (
--     id_pizza SERIAL PRIMARY KEY,
--     sabor VARCHAR(100) NOT NULL,
--     tamanho VARCHAR(10) NOT NULL,
--     preco DECIMAL(10,2) NOT NULL
-- );

-- CREATE TABLE pedido (
--     id_pedido SERIAL PRIMARY KEY,
--     atendente_id INT NOT NULL,
--     cliente_id INT NOT NULL,
--     data_pedido DATE NOT NULL,
--     valor_total DECIMAL(10,2) NOT NULL,
--     status VARCHAR(20) DEFAULT 'Em andamento',
--     FOREIGN KEY (atendente_id) REFERENCES atendente(id_atendente),
--     FOREIGN KEY (cliente_id) REFERENCES cliente(id_cliente)
-- );

-- CREATE TABLE pedido_pizza (
--     id_pedido INT NOT NULL,
--     id_pizza INT NOT NULL,
--     quantidade INT NOT NULL,
--     PRIMARY KEY (id_pedido, id_pizza),
--     FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
--     FOREIGN KEY (id_pizza) REFERENCES pizza(id_pizza)
-- );

INSERT INTO atendente (nome_atendente, senha) VALUES ('admin', 'admin');

INSERT INTO cliente (nome, bairro, telefone) VALUES ('João', 'Centro', '99999999999');