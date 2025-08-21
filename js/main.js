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
    import { ContagemViewModel } from "../Contagem/ContagemViewModel.js";
    import { ContagemView } from "../Contagem/ContagemView.js";
    import { ContadorViewModel } from "../Contador/ContadorViewModel.js";
    import { ContadorView } from "../Contador/ContadorView.js";
    import { RelogioViewModel } from "../Relogio/RelogioViewModel.js";
    import { RelogioView } from "../Relogio/RelogioView.js";

    const containerModal = document.getElementById('container-modal');
    const botaoTarefa = document.getElementById('adiciona-tarefa');    

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
    const ctvm = new ContagemViewModel();
    const contagemView = new ContagemView(ctvm);
    const ctdvm = new ContadorViewModel();
    const contadorView = new ContadorView(ctdvm);
    const rvm = new RelogioViewModel();
    const relogioView = new RelogioView(rvm);

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
        contagemView.exibirContagem('contagemRegressiva')
        contadorView.exibirContador('contador')
        relogioView.exibirRelogio('relogio')
        
        const botaoAdicionaContagem = document.getElementById('adiciona-contagem');
        const botaoDiminuiContagem = document.getElementById('diminui-contagem');

        //Adiciona tarefa
        botaoTarefa.addEventListener("click", async (evento) => { 
            evento.preventDefault();   

            const descricaoTarefa = document.getElementById('descricao-tarefa').value
            const inputIdTarefa = document.getElementById('id-tarefa').value;

            if (descricaoTarefa === '') {
                alert('É necessário inserir uma tarefa!');
                return
            }
            const tarefa = {
                id: inputIdTarefa,
                Tarefa: descricaoTarefa,
                Adicionado:  new Date().toLocaleDateString("pt-BR"),
                Feito: false
            }
            console.log(tarefa);            
            await tvm.salvarTarefa(tarefa);
            tarefaView.listarTarefas('lista-tarefa')
        });

    })();   

 
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