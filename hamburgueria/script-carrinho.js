// **************** Constante necessária *************************
let carrinho = []; // array global para armazenar os itens

// Preenchimento do carrinho com os itens salvos no localStorage
function preencherCarrinho() {
  const carrinhoSalvo = localStorage.getItem('carrinho');

  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo); // atualiza o array global
    atualizarCarrinhoVisual(); // usa a função estruturada
    atualizarContadorCarrinho(); // atualiza contador do carrinho
  }
}



// Abre o carrinho
document.getElementById('icone-carrinho').addEventListener('click', () => {
  preencherCarrinho();
  document.getElementById('carrinho-sidebar').classList.add('aberto');
});

// Fecha o carrinho
function fecharCarrinho() {
  document.getElementById('carrinho-sidebar').classList.remove('aberto');
}

// Funcão Adiciona Ao Carrinho
function adicionaAoCarrinho(item) {
  const existente = carrinho.find(produto => produto.nome === item.nome);

  if (existente) {
    alert("Este item já está no carrinho. Altere a quantidade dentro do carrinho.");
    return;
  }

  // Converte o preço para número (remove R$ e troca vírgula por ponto)
  const precoNumerico = parseFloat(item.preco.replace("R$", "").replace(",", "."));

  carrinho.push({ ...item, quantidade: 1, precoNumerico });

  atualizarCarrinhoVisual();
  atualizarContadorCarrinho();
  salvarCarrinhoNoLocalStorage();

}

// Função de Alterar Carrinho Virtual
function atualizarCarrinhoVisual() {
  const container = document.getElementById('itens-carrinho');
  container.innerHTML = '';

  // Atualiza o visual
  carrinho.forEach((produto, index) => {
    const total = (produto.quantidade * produto.precoNumerico).toFixed(2).replace(".", ",");

    const div = document.createElement('div');
    div.classList.add('item-carrinho');
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" width="50" height="50">
      <div class="info-carrinho">

        <p><strong>${produto.nome}</strong></p>
        <p>R$ ${total} (${produto.quantidade}x)</p>
      </div>
      <div class="quantidade">
        <button onclick="alterarQuantidade(${index}, -1)">-</button>
        <span>${produto.quantidade}</span>
        <button onclick="alterarQuantidade(${index}, 1)">+</button>
      </div>
    `;
    container.appendChild(div);
  });

  // Salva no localStorage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}
// Carrega o carrinho quando a página é inicilizada
window.addEventListener('DOMContentLoaded', () => {
  const salvo = localStorage.getItem('carrinho');
  if (salvo) {
    carrinho = JSON.parse(salvo);
    atualizarCarrinhoVisual();
  }
});

// Limpa o carrinho ao efetuar a compra

function efetuarCompra() {
  // Aqui você pode enviar o carrinho ao backend
  alert("Compra finalizada!");
  carrinho = [];
  localStorage.removeItem('carrinho');
  atualizarCarrinhoVisual();
}



// Função de Alterar Quantidade
function alterarQuantidade(index, delta) {
  carrinho[index].quantidade += delta;

  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1); // remove se a quantidade zerar
  }

  atualizarCarrinhoVisual();
  atualizarContadorCarrinho();
  salvarCarrinhoNoLocalStorage();
}

// Atualiza Contador do Carrinho
function atualizarContadorCarrinho() {
  const contador = document.getElementById('contador-carrinho');
  contador.textContent = carrinho.length;

  
}

// Função Finalizar Pedido
function finalizarPedido() {
  const carrinhoSalvo = localStorage.getItem('carrinho');

  const carrinhoEstaVazio = !carrinhoSalvo || JSON.parse(carrinhoSalvo).length === 0;

  if (carrinhoEstaVazio) {
    alert("O Carrinho está vazio!");
  } else {
    alert("Segue lógica para envio!");
  }
}

// Função salva Carrinho No Local Storage
function salvarCarrinhoNoLocalStorage() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}


// Função para Atualizar contador do Carrinho
window.addEventListener('load', () => {
  atualizarContadorCarrinho();
});
