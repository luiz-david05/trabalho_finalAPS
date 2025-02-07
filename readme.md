# Trabalho final da disciplina de Analise e Projeto de Sistemas

## Integrantes
- [Luiz David Silva Gomes] 
- [Wanderson MAtheus de Sousa Barbosa]

## Descrição
Este repositório contém o trabalho final da disciplina de Análise e Projeto de Sistemas, ministrada pela professora Aline. O trabalho consiste em desenvolver um sistema de controle de uma pizzaria delivery, com funcionalidades para cadastrar clientes, anotar pedidos, calcular o valor total dos pedidos, etc. O sistema foi desenvolvido em javascript, utilizando Node.js no backend e Html e Css no frontend.

## Funcionalidades
- [x] login
- [x] pagina de cadastro de cliente
- [x] pagina de cadastrar pedido e resumo do pedido.

## Casos de Uso
- [Caso de Uso: Logar no Sistema](trabalho_final/casos_de_uso/loga_sistema.md)
- [Caso de Uso: Anotar Pedido](trabalho_final/casos_de_uso/anota_pedido.md)

## Diagrama de Sequência
![Diagrama de Sequência: Logar no Sistema](trabalho_final/diagrama_sequencia/logar_sistema.png)
![Diagrama de Sequência: Anotar Pedido](trabalho_final/diagrama_sequencia/anota_pedido.png)

## Diagrama de Classes
![Diagrama de Classes](trabalho_final/diagrama_classes/pizzaria.puml)

## Como rodar o projeto
1. Clone o repositório
2. Abra o terminal na pasta do projeto
3. Instale as dependências com o comando `npm install`
4. Instale o dotenv com o comando `npm install dotenv` para importar as variáveis de ambiente no arquivo .env
5. Instale as dependencias do express, pg e cors com o comando `npm install express pg cors`
6. Rode o projeto com o comando `npm start`
7. Acesse o projeto em `http://localhost:3000` ou instale a extensão live server no vscode e acesse o projeto em `http://localhost:5500`
