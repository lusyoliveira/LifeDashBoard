    import { } from "./metodoContador.js";
    import { EstudoViewModel } from "../Estudo/EstudoViewModel.js";
    import { EstudoView } from "../Estudo/EstudoView.js";
    import { CatalogoViewModel } from "../Catalogo/CatalogoViewModel.js";
    import { CatalogoView } from "../Catalogo/CatalogoView.js";
    import { TarefasViewModel } from "../Tarefas/TarefasViewModel.js";
    import { TarefasView } from "../Tarefas/TarefasView.js";
    import { AgendaViewModel } from "../Agenda/AgendaViewModel.js";
    import { AgendaView } from "../Agenda/AgendaView.js";
    import { ClimaViewModel } from "../Clima/ClimaViewModel.js";
    import { ClimaView } from "../Clima/ClimaView.js";
    import { contagemRegressiva } from "./metodoContagemRegressiva.js";
    import { relogio } from "./metodoRelogio.js";
    import  apiClima  from "./apiClima.js";
    import { carregarConfiguracores } from "./configuracoes.js";

    const containerModal = document.getElementById('container-modal');
    const inputIdTarefa = document.getElementById('id-tarefa').value;
    const botaoTarefa = document.getElementById('adiciona-tarefa');     
    const descricaoContagem = document.getElementById('descricao-contagem');
    const configuracoes = (await carregarConfiguracores())[0] 

    const tvm = new TarefasViewModel("tarefas");
    const tarefaView = new TarefasView(tvm);
    const evm = new EstudoViewModel("cursos");
    const estudoView = new EstudoView(evm);
    const cvm = new CatalogoViewModel("catalogo");
    const catalogoView = new CatalogoView(cvm);
    const avm = new AgendaViewModel("agenda");
    const agendaView = new AgendaView(avm);
    const clvm = new ClimaViewModel("clima");
    const climaView = new ClimaView(clvm);

    (async () => {
        await evm.obterCursos(); 
        await tvm.obterTarefas();   
        await cvm.obterCatalogo(); 
        await avm.obterAgenda();

        estudoView.renderCursando("Cursando");
        tarefaView.listarTarefas('lista-tarefa')
        catalogoView.renderAssistindo(['Assistindo','Reassistindo'],'Assistindo')
        agendaView.renderProximosCompromissos('proximos-compromissos')
        agendaView.renderCalendario('calendario')
        climaView.exibirClima('clima')
    })();

 //Adiciona tarefa
    botaoTarefa.addEventListener("click", async (evento) => { 
        evento.preventDefault();   
        const tarefa = tarefaView.preencherTarefa('tarefa',inputIdTarefa)
        await tarefaView.salvarTarefa(tarefa);
        tarefaView.listarTarefas('lista-tarefa')
    });

contagemRegressiva(configuracoes.DataContagem);
descricaoContagem.textContent = configuracoes.DescricaoContagem;
relogio();
//apiClima.exibirClima()

//exibe calendario
//criarCalendario();


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