CREATE TABLE usuario (
	id_usuario SERIAL PRIMARY KEY,
    nome_usuario VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE atendente (
	id_atendente SERIAL PRIMARY KEY,
	nome_atendente VARCHAR(100) NOT NULL
);

CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    telefone VARCHAR(12) NOT NULL
);

CREATE TABLE cardapio (
	id_cardapio SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL
);

CREATE TABLE item_cardapio (
	id_item_cardapio SERIAL PRIMARY KEY,
	cardapio_id INT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	descricao VARCHAR(100) NOT NULL,
	FOREIGN KEY (cardapio_id) REFERENCES cardapio(id_cardapio)
);

CREATE TABLE item_pedido (
	id_item_pedido SERIAL PRIMARY KEY,
	item_cardapio_id INT NOT NULL,
	qtd INT NOT NULL,
	descricao VARCHAR(100) NOT NULL,
	FOREIGN KEY (item_cardapio_id) REFERENCES item_cardapio(id_item_cardapio)
);

CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
	atendente_id INT NOT NULL,
	item_pedido_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'Em andamento',
    FOREIGN KEY (cliente_id) REFERENCES cliente(id_cliente),
	FOREIGN KEY (atendente_id) REFERENCES atendente(id_atendente),
	FOREIGN KEY (item_pedido_id) REFERENCES item_pedido(id_item_pedido)
);

INSERT INTO usuario (nome_usuario, senha) 
VALUES ('adm', 'adm');

SELECT * FROM usuario WHERE nome_usuario = 'adm';