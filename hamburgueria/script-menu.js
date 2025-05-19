// Seleciona o container onde os itens serão exibidos
const menu = document.getElementById('menu');

// Carrega o MENU
fetch('cardapio.json')
  .then(response => response.json())
  .then(cardapio => {
    // Percorre os itens e monta o HTML
    cardapio.forEach(item => {
      exibirItens(cardapio);
      filtrarCategorias(cardapio);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar o cardápio:', error);
  });

//Função para exibir itens do cardápio
  function exibirItens(itens) {
  const menu = document.getElementById('menu');
  menu.innerHTML = '';  // Limpa itens anteriores
  itens.forEach(item => {
    const div = document.createElement('div');
          div.classList.add('menu-item');

      div.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <h2>${item.nome}</h2>
        <p>${item.descricao}</p>
        <span class="preco">${item.preco}</span>
        <button onClick='adicionaAoCarrinho(${JSON.stringify(item)})'>Peça Agora</button>
      `;
    menu.appendChild(div);
  });
}

//Função para filtrar itens por categoria do cardápio
function filtrarCategorias(produtos) {
  const categorias = document.querySelectorAll('#categorias li');
  const mapTipo = {
    'TODOS': null,
    'HAMBURGERS': 'hamburguer',
    'BEBIDAS': 'bebida',
    'OUTROS': 'combo'
  };

  // Destaca "TODOS" inicialmente
  categorias[0].classList.add('ativo');

  categorias.forEach(li => {
    li.addEventListener('click', () => {
      // Atualiza destaque visual
      categorias.forEach(el => el.classList.remove('ativo'));
      li.classList.add('ativo');

      // Determina filtro pelo texto do item clicado
      const cat = li.textContent;
      const filtro = mapTipo[cat]; // null para 'TODOS'
      
      // Filtra itens: se filtro é null, mostra todos, senão filtra pelo tipo
      const filtrados = filtro 
        ? produtos.filter(p => p.tipo === filtro)
        : produtos;
      exibirItens(filtrados);
    });
  });
}