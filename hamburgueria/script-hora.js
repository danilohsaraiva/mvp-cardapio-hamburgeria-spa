function atualizarStatusAtendimento() {
  const statusElemento = document.getElementById('status-hora');
  const agora = new Date();
  const hora = agora.getHours();

  const aberto = (hora >= 18 && hora < 22);

  if (aberto) {
    statusElemento.textContent = 'Aberto';
    statusElemento.style.color = 'white';
    statusElemento.style.backgroundColor = 'green';
    statusElemento.style.borderRadius = '15px';
  } else {
    statusElemento.textContent = 'Fechado';
    statusElemento.style.backgroundColor = 'red';
  }
}

// Atualiza na hora que carrega a página
window.addEventListener('load', atualizarStatusAtendimento);

// Atualiza a cada minuto (pra não precisar dar refresh)
setInterval(atualizarStatusAtendimento, 60000);