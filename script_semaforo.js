document.addEventListener("DOMContentLoaded", function() {
    const confirmButton = document.getElementById("confirm-button");
    const userForm = document.getElementById("user-form");
    const simulator = document.getElementById("simulator");

    confirmButton.addEventListener("click", function() {
        const username = document.getElementById("username").value.trim();
        if (username) {
            userForm.style.display = "none";
            simulator.style.display = "block";
            iniciarSemaforo();
        } else {
            alert("Por favor, digite seu nome.");
        }
        alert(`Bem-vindo, ${username}! Você está no simulador de semáforo inteligente.`);
    });
});

function iniciarSemaforo() {
    const semaforo = document.getElementById("semaforo");
    const carro = document.getElementById("carro");
    const status = document.getElementById("status");
    const contador = document.getElementById("contador");
    const atravessar = document.getElementById("atravessar");

    let tempo = 0;
    let intervalo;
    let luz = 'vermelho';

    function atualizarContador() {
        tempo++;
        contador.textContent = `Tempo: ${tempo}s`;
    }

    function iniciarCicloSemaforo() {
        luz = 'vermelho';
        semaforo.className = 'luz vermelho';
        carro.style.left = "0px";
        status.textContent = "Sinal vermelho. Aguardando...";
        contador.textContent = "Tempo: 0s";
        tempo = 0;
        intervalo = setInterval(atualizarContador, 1000);

        setTimeout(() => {
            luz = 'verde';
            semaforo.className = 'luz verde';
            status.textContent = "Sinal verde. Pode atravessar!";
            moverCarro();
        }, 10000); // Tempo de luz vermelha
    }

    function moverCarro() {
        carro.style.left = "0px"; // Reseta a posição do carro
        let posicao = 0;

        function animarCarro() {
            if (luz === 'verde') {
                posicao += 5; // Move o carro 5 pixels para a direita
                carro.style.left = posicao + "px";
                
                if (posicao < 500) {
                    requestAnimationFrame(animarCarro);
                } else {
                    posicao = 0; // Reseta a posição do carro

                    carro.style.left = posicao + "px";
                }
            }
        }
        requestAnimationFrame(animarCarro);
    }

    atravessar.addEventListener('click', () => {
        clearInterval(intervalo); // Para o contador
        luz = 'vermelho'; // Define a luz como vermelha
        semaforo.className = 'luz vermelho';
        status.textContent = "Atravessando...";

        setTimeout(() => {
            iniciarCicloSemaforo(); // Reinicia o ciclo do semáforo
        }, 5000); // Tempo de espera antes de mudar para verde
    }
    );
    iniciarCicloSemaforo(); // Inicia o ciclo do semáforo
    carro.style.display = "block"; // Exibe o carro
    semaforo.style.display = "block"; // Exibe o semáforo
    status.textContent = "Sinal vermelho. Aguardando...";
    contador.textContent = "Tempo: 0s";
    tempo = 0;
    intervalo = setInterval(atualizarContador, 5000); // Inicia o contador
}














































/*
const cadastro = document.getElementById("cadastro");
const nomeInput = document.getElementById("nome");
const carro = document.getElementById("carro");
const semaforo = document.getElementById("semaforo");
const status = document.getElementById("status");
const contador = document.getElementById("contador");
const atravessar = document.getElementById("atravessar");
const vermelho = document.querySelector("vermelho");
const verde = document.querySelector("verde");
const amarelo = document.querySelector("amarelo");

let tempo = 0;
let intervalo;
let luz = 'verde';
let counter = duration;

function iniciarSemaforo(cor) {
    vermelho.classList.remove("active");
    verde.classList.remove("active");
    amarelo.classList.remove("active");

    if(cor === "vermelho") {
        vermelho.classList.add("active");
        carro.style.left = carro.offsetLeft + "px"; // Reseta a posição do carro

    } else if(cor === "verde") {
        verde.classList.add("active");
        semaforo.style.backgroundColor = "green";
        moverCarro();
    } else if(cor === "amarelo") {
        amarelo.classList.add("active");
        carro.style.left = carro.offsetLeft + "px"; // Reseta a posição do carro
    }
    
}

function moverCarro() {
    let posição = -60
    carro.style.left = posição + "px"; // Reseta a posição do carro

    function mover() {
        if (luz !== 'verde') return; // Se não for verde, não move o carro
        posição += 5; // Move o carro 5 pixels para a direita
        if (posição >= 500) posição = -60; // Se o carro passar do limite
        carro.style.left = posição + "px"; // Atualiza a posição do carro
        requestAnimationFrame(mover); // Continua o movimento
    }
    requestAnimationFrame(mover); // Inicia o movimento do carro
}

    semaforoLigado = true;
    carro.style.display = "block";
    semaforo.style.backgroundColor = "red";
    status.textContent = "Sinal vermelho. Aguardando...";
    contador.textContent = "Tempo: 0s";
    tempo = 0;
    intervalo = setInterval(atualizarContador, 1000); 

function iniciarSemaforo() {
    if (luz === 'verde') {
        iniciarSemaforo = 'verde'; // Muda a luz para vermelho
        intervalo = setTimeout(() => {
            luz = 'verde'; // Muda a luz para verde
            iniciarSemaforo('verde'); // Inicia o semáforo com luz verde
            intervalo = setTimeout(() => {
            luz = 'amarelo'; // Muda a luz para amarelo
            iniciarSemaforo('amarelo'); // Inicia o semáforo com luz amarela
        intervalo = setTimeout(() => {
            luz = 'vermelho'; // Muda a luz para vermelho
            
            iniciarSemaforo('vermelho'); // Inicia o semáforo com luz vermelha
            iniciarSemaforo(); // Reinicia o semáforo
        }, 150000); // Tempo de luz verde
        }, 3000); // Tempo de luz amarela
    }, 1000); // Tempo de luz vermelha
    }

atravessar.addEventListener('click', () => {
    clearTimeout(intervalo); // Para o contador
    luz = 'vermelho'; // Define a luz como vermelha
    iniciarSemaforo('vermelho'); // Inicia o semáforo com luz vermelha
    intervalo = setTimeout(() => {
        luz = 'verde'; // Muda a luz para verde
        iniciarSemaforo('verde'); // Inicia o semáforo com luz verde
        contador.textContent = "Atravessando..."; // Atualiza o status
    }, 10000); // Tempo de espera antes de mudar para verde
}
);

};
*/