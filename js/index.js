import { adicionarTarefa } from "./tarefas.js";
import { verificaLista } from "./mensagemTarefa.js";
import { aumentaContador, diminuiContador } from "./contador.js";
import { contagemRegressiva } from "./contagem.js";
import { relogio } from "./relogio.js";

const botaoTarefa = document.getElementById('adiciona-tarefa');
const botaoAdicionaContagem = document.getElementById('adiciona-contagem');
const botaoDiminuiContagem = document.getElementById('diminui-contagem');
const listaTarefa = document.getElementById('lista-tarefa');
const novoContador = document.getElementById('contador');
const btnEvento = document.getElementById('adiciona-evento');
const spanFechar = document.querySelector('.fechar');
const container = document.getElementById('container-modal');

//Aumenta contador
botaoAdicionaContagem.addEventListener("click", (evento) => { 
    evento.preventDefault();
     
    const novaValor = aumentaContador();
    novoContador.innerText = novaValor;    
});

//Diminui contador
botaoDiminuiContagem.addEventListener("click", (evento) => { 
    evento.preventDefault();
     
    const novaValor = diminuiContador();
    novoContador.innerText = novaValor;    
});

//Adiciona tarefa
botaoTarefa.addEventListener("click", (evento) => { 
    evento.preventDefault();
          
    const tarefa = adicionarTarefa();
    
    listaTarefa.appendChild(tarefa);
    verificaLista(listaTarefa);
});

// Modal adicionar evento
btnEvento.addEventListener("click", async () => {
    // Carrega o HTML externo do modal
    const resposta = await fetch("modalTarefa.html");
    const html = await resposta.text();

    // Insere o modal no container
    container.innerHTML = html;

    const modal = document.getElementById("meuModal");
    const fechar = modal.querySelector(".btn-close");

    modal.style.display = "block";

    fechar.onclick = () => modal.style.display = "none";

    window.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
    };
});

verificaLista(listaTarefa);
contagemRegressiva();
relogio();