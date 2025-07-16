import { } from "./metodoTarefas.js";
import { } from "./metodoContador.js";
import { criarCalendario, proximosCompromissos, carregarAgenda } from "./agenda.js";
import { cursandoPrincipal, carregarCursos } from "./estudo.js";
import { assistindoPrincipal, carregarTvList } from "./tvList.js";
import { contagemRegressiva } from "./metodoContagemRegressiva.js";
import { relogio } from "./metodoRelogio.js";

const btnEvento = document.getElementById('adiciona-evento');
const container = document.getElementById('container-modal');

let dataAtual = new Date();
let mesAtual = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear();

//Exibe cursando
document.addEventListener('DOMContentLoaded', async () => {
    await carregarCursos();
    const linhas = document.querySelectorAll('.row');          

    linhas.forEach(linha => {
        if (linha.dataset.filtro === 'cursos') {
            const status = linha.dataset.status || linha.textContent.trim();
            cursandoPrincipal(status, linha.id);
        }  
    });        
});

document.addEventListener('DOMContentLoaded', () => {
    carregarAgenda().then(() => {
        const diasCalendario = document.querySelector('#calendario-dias');            
        const btnAnterior = document.getElementById('botao-anterior');
        const btnProximo = document.getElementById('botao-proximo');            
        const listas = document.querySelectorAll('.list-group');

        //exibe lista de próximo compromissos
        listas.forEach(lista => {
            if (lista.dataset.filtro === 'compromissos') {
                proximosCompromissos(lista.id)
            }
        });

        //exibe calendario
        criarCalendario(mesAtual, anoAtual, diasCalendario);
        
        btnAnterior.addEventListener('click', () => {
            mesAtual--;
        if (mesAtual < 0) {
            mesAtual = 11;
            anoAtual--;
        }
        dataAtual = new Date(anoAtual, mesAtual);
        criarCalendario(mesAtual, anoAtual,diasCalendario);
        });

        btnProximo.addEventListener('click', () => {
        mesAtual++;
        if (mesAtual > 11) {
            mesAtual = 0;
            anoAtual++;
        }
        dataAtual = new Date(anoAtual, mesAtual);
        criarCalendario(mesAtual, anoAtual,diasCalendario);
        });
    });

    //Exibe o assistindo
     carregarTvList().then(() => {
        const linhas = document.querySelectorAll('.row');          

        linhas.forEach(linha => {
            // Filtro por Status
            if (linha.dataset.filtro === 'principal') {
                const status = linha.dataset.status;
                assistindoPrincipal(status, linha.id);
            }  
        });           
    });
});


//Modal adicionar evento
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

contagemRegressiva();
relogio();