import { } from "./metodoTarefas.js";
import { } from "./metodoContador.js";
import { criarCalendario, proximosCompromissos } from "./agenda.js";
import { cursandoPrincipal, carregarCursos } from "./estudo.js";
import { assistindoPrincipal, carregarTvList } from "./tvList.js";
import { contagemRegressiva } from "./metodoContagemRegressiva.js";
import { relogio } from "./metodoRelogio.js";
import  apiClima  from "./apiClima.js";
import { carregarConfiguracores } from "./configuracoes.js";

const containerModal = document.getElementById('container-modal');
const listas = document.querySelectorAll('.list-group');            
const configuracoes = (await carregarConfiguracores())[0] 

//Exibe cursando
document.addEventListener('DOMContentLoaded', async () => {
    //await carregarCursos();
    const linhas = document.querySelectorAll('.row');          

    linhas.forEach(linha => {
        if (linha.dataset.filtro === 'cursos') {
            const status = linha.dataset.status || linha.textContent.trim();
            cursandoPrincipal(status, linha.id);
        }  
    });        
});

document.addEventListener('DOMContentLoaded', () => {
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
// btnEvento.addEventListener("click", async () => {
//     // Carrega o HTML externo do modal
//     const resposta = await fetch("modalTarefa.html");
//     const html = await resposta.text();

//     // Insere o modal no container
//     containerModal.innerHTML = html;

//     const modal = document.getElementById("meuModal");
//     const fechar = modal.querySelector(".btn-close");

//     modal.style.display = "block";

//     fechar.onclick = () => modal.style.display = "none";

//     window.onclick = (e) => {
//         if (e.target === modal) modal.style.display = "none";
//     };
// });

contagemRegressiva(configuracoes.DataContagem);
relogio();
apiClima.exibirClima()
//exibe lista de próximo compromissos
listas.forEach(lista => {
    if (lista.dataset.filtro === 'compromissos') {
        proximosCompromissos(lista.id)
    }
});
//exibe calendario
criarCalendario();
