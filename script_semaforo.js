// === Seletores
const usernameInput = document.getElementById("username");
const confirmButton = document.getElementById("confirm-button");
const simulador = document.getElementById("simulador");
const atravessarButton = document.getElementById("atravessar");
const luzes = document.querySelectorAll(".luz");
const statusText = document.getElementById("status-text");
const contadorDisplay = document.getElementById("contador-tempo");
const carro = document.getElementById("carro");



// === Estados
let etapaSemaforo = 0; // 0: verde, 1: amarelo, 2: vermelho
let tempoRestante = 15;
let intervalo = null;
let pedestreSolicitou = false;

// === Confirmação do nome
confirmButton.addEventListener("click", () => {
  const nome = usernameInput.value.trim();
  if (nome === "") {
    alert("Digite seu nome!");
    return;
  }
  simulador.style.display = "block";
  alert(`Bem-vindo, ${nome}!`);
  document.getElementById("usuario").style.display = "none";
  iniciarCiclo();
});

// === Atualiza semáforo visual
function atualizarSemaforo() {
  luzes.forEach((luz, index) => {
    luz.classList.remove("ativado");
    if (index === etapaSemaforo) {
      luz.classList.add("ativado");
    }
  });

  atualizarStatus();

  // Carro anda no vermelho
  if (etapaSemaforo === 2) {
    moverCarro();
  }
}

// ✅ Agora com status baseados no ponto de vista do PEDESTRE
function atualizarStatus() {
  if (etapaSemaforo === 0) {
    // Semáforo vermelho para os carros
    statusText.textContent = "✅ Atravessar com segurança";
  } else {
    // Qualquer outro estado: verde ou amarelo
    statusText.textContent = "🛑 Não atravesse!";
  }
}

// === Atualiza contador
function atualizarContador() {
  contadorDisplay.textContent = `Tempo restante: ${tempoRestante}s`;
}

// === Move o carro durante o vermelho
function moverCarro() {
  carro.style.left = "100%";
  setTimeout(() => {
    carro.style.transition = "none";
    carro.style.left = "-100px";
    void carro.offsetWidth; // força reflow
    carro.style.transition = "left 5s linear";
  }, 5000);
}

// === Inicia o ciclo
function iniciarCiclo() {
  definirTempo();
  atualizarSemaforo();
  atualizarContador();

  intervalo = setInterval(() => {
    tempoRestante--;
    atualizarContador();

    if (tempoRestante <= 0) {
      mudarEtapa();
    }
  }, 1000);
}

// === Define tempo para cada fase
function definirTempo() {
  if (etapaSemaforo === 0) tempoRestante = 15; // Verde
  else if (etapaSemaforo === 1) tempoRestante = 3; // Amarelo
  else if (etapaSemaforo === 2) tempoRestante = 10; // Vermelho
}

// === Transição entre etapas
function mudarEtapa() {
  if (etapaSemaforo === 2) {
    etapaSemaforo = 1; // Verde → Amarelo
  } else if (etapaSemaforo === 1) {
    etapaSemaforo = 0; // Amarelo → Vermelho
  } else if (etapaSemaforo === 0) {
    etapaSemaforo = 2; // Vermelho → Verde
  }
  if (pedestreSolicitou) {
      pedestreSolicitou = false;
    }

  definirTempo();
  atualizarSemaforo();
  atualizarContador();
}

// === Pedestre solicita travessia
atravessarButton.addEventListener("click", () => {
  if (etapaSemaforo === 2 || etapaSemaforo === 1) {
    pedestreSolicitou = true;
    statusText.textContent = "⏳ Aguardando momento seguro para atravessar...";
  }
});



//Ele funciona direitinho a partir do segundo ciclo, tentei de tudo, mas não consegui identificar esse erro no começo