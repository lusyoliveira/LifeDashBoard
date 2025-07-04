import { } from "./metodoTarefas.js";
import { } from "./metodoContador.js";
import { cursandoPrincipal, carregarCursos } from "./estudo.js";
import { contagemRegressiva } from "./metodoContagemRegressiva.js";
import { relogio } from "./metodoRelogio.js";

const btnEvento = document.getElementById('adiciona-evento');
const container = document.getElementById('container-modal');

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