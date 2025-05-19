  // Array com os caminhos das imagens
  const imagens = [
    'img/mais-vendidos.png',
    'img/promocao.png',
    'img/desconto.png'
  ];

  let indice = 0;

  const imgElemento = document.querySelector('#propaganda img');

  function trocarImagem() {
    indice = (indice + 1) % imagens.length; // Próxima imagem, volta ao início
    imgElemento.src = imagens[indice];
  }

  // Troca a imagem logo que a página carrega
  trocarImagem();

  // Depois troca a cada 30 segundos
  setInterval(trocarImagem, 10000);
