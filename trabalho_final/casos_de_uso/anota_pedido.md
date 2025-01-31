# Caso de uso: Anotar Pedido

## Descrição
Este caso de uso descreve como um atendente pode anotar um pedido, registrando as informações do cliente e do pedido no sistema.

## Atores
- Atendente

## Pré-condições
- O atendente deve estar logado no sistema.

## Fluxo Principal
1. O caso de uso começa quando o atendente seleciona a opção de anotar pedido.
2. O atendente insere os dados do cliente (nome, telefone, etc.).
3. O sistema verifica se o cliente já está cadastrado no banco de dados:
   - Se o cliente já existe, o sistema retorna as informações do cliente.
   - Se o cliente não existir, o atendente cadastra o cliente no sistema.
4. O atendente insere os itens do pedido, especificando sabor, tamanho e quantidade.
5. O sistema cadastra o pedido no banco de dados, associando-o ao cliente.
6. O sistema exibe um resumo do pedido para o atendente (itens, valor total, etc.).

## Fluxo Alternativo
- Caso o atendente cancele o pedido, o processo é interrompido e nenhuma informação é registrada no sistema.

## Pós-condições
- O pedido é registrado no sistema e associado ao cliente.
- O cliente é cadastrado no sistema, caso não estivesse previamente registrado.

## Pontos de Extensão
- O atendente pode anotar observações adicionais sobre o cliente ou o pedido.
- O atendente pode registrar a forma de pagamento do cliente (dinheiro, cartão, etc.).