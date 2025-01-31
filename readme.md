# Trabalho final da disciplina de Analise e Projeto de Sistemas

## Integrantes
- [Nome do Integrante 1](Luiz David Silva Gomes)
- [Nome do Integrante 2](Tchola)

## Descrição
Este repositório contém o trabalho final da disciplina de Análise e Projeto de Sistemas, ministrada pela professora [Nome da Professora](Aline). O trabalho consiste em desenvolver um sistema de controle de uma pizzaria delivery, com funcionalidades para cadastrar clientes, anotar pedidos, calcular o valor total dos pedidos, etc. O sistema foi desenvolvido em javascript, utilizando Node.js no backend e Html e Css no frontend.

## Funcionalidades
- [x] login
- [x] pagina principal
- [x] pagina de anotar pedido
- [x] pagina de visualizar resumo do pedido, valor total e finalizar pedido.

## Casos de Uso
- [Caso de Uso: Logar no Sistema](casos_de_uso/loga_sistema.md)
- [Caso de Uso: Anotar Pedido](casos_de_uso/anota_pedido.md)

## Diagrama de Sequência
![Diagrama de Sequência: Logar no Sistema](diagrama_sequencia/loga_sistema.puml)
![Diagrama de Sequência: Anotar Pedido](diagrama_sequencia/anota_pedido.puml)

## Diagrama de Classes
![Diagrama de Classes](diagrama_classes/pizzaria.puml)

## Como rodar o projeto
1. Clone o repositório
2. Abra o terminal na pasta do projeto
3. Instale as dependências com o comando `npm install`
4. Instale o dotenv com o comando `npm install dotenv` para importar as variáveis de ambiente no arquivo .env
5. Instale as dependencias do express, pg e cors com o comando `npm install express pg cors`
6. Rode o projeto com o comando `npm start`
7. Acesse o projeto em `http://localhost:3000`