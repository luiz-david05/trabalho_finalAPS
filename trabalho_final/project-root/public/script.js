// Array para armazenar os pedidos
let pedidos = [];

// Função para calcular o preço com base no sabor e tamanho da pizza
function calcularPreco(sabor, tamanho) {
    let preco = 0;
    const precoBase = {
        'mussarela': 20,
        'calabresa': 22,
        'portuguesa': 25
    };

    const precoTamanho = {
        'pequena': 1,
        'media': 1.5,
        'grande': 2
    };

    if (precoBase[sabor]) {
        preco = precoBase[sabor] * (precoTamanho[tamanho] || 1);
    }

    return preco;
}

function mostrarResumo(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Obtendo os valores do formulário
    const sabor = document.getElementById('sabor').value;
    const tamanho = document.getElementById('tamanho').value;
    const quantidade = document.getElementById('quantidade').value;

    // Calculando o preço
    const precoUnitario = calcularPreco(sabor, tamanho);
    const precoTotal = precoUnitario * quantidade;

    // Adicionando o pedido ao array de pedidos
    pedidos.push({
        sabor,
        tamanho,
        quantidade,
        precoUnitario,
        precoTotal
    });

    // Exibindo o resumo
    let resumoHTML = "<h2>Resumo do Pedido</h2>";
    let precoTotalGeral = 0;

    pedidos.forEach((pedido, index) => {
        resumoHTML += `
            <p><strong>Pizza ${index + 1}:</strong></p>
            <p><strong>Quantidade:</strong> ${pedido.quantidade}</p>
            <p><strong>Sabor da Pizza:</strong> ${pedido.sabor.charAt(0).toUpperCase() + pedido.sabor.slice(1)}</p>
            <p><strong>Tamanho da Pizza:</strong> ${pedido.tamanho.charAt(0).toUpperCase() + pedido.tamanho.slice(1)}</p>
            <p><strong>Preço unitário:</strong> R$ ${pedido.precoUnitario.toFixed(2)}</p>
            <p><strong>Preço total:</strong> R$ ${pedido.precoTotal.toFixed(2)}</p>
            <hr>
        `;
        precoTotalGeral += pedido.precoTotal;
    });

    resumoHTML += `
        <p><strong>Preço total do pedido:</strong> R$ ${precoTotalGeral.toFixed(2)}</p>
        <button id="finalizarPedido" onclick="finalizarPedido()">Finalizar Pedido</button>
    `;

    // Inserindo o resumo na página
    document.getElementById('resumo').innerHTML = resumoHTML;
}

// Função para finalizar o pedido (simulando a ação)
function finalizarPedido() {
    alert("Pedido finalizado com sucesso!");

    // Redirecionando para a página de confirmação com o tempo estimado como parâmetro na URL
    window.location.href = `confirmacao.html`;
}