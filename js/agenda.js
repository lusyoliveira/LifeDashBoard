import { calculaTempoData, converteDataUTC } from "./metodoData.js";
import api from './metodoApi.js'
import { listarTarefas } from "./metodoTarefas.js";

let agenda = [];
let agendaConvertida = [];

const endpoint = 'agenda';
const formAgenda = document.getElementById('agenda-form');
const btnCancelar = document.getElementById('cancelar-agenda');
const calendarioContainer = document.getElementById('calendario');

export async function carregarAgenda() {
    agenda = await api.buscarDados(endpoint);
       agendaConvertida = agenda.map(compromisso => {
        const data = new Date(compromisso.Data);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return {
        ...compromisso,
        Data: `${dia}/${mes}/${ano}`
        };
    });
    return agendaConvertida
};

document.addEventListener('DOMContentLoaded', () => {
     if (window.location.pathname.endsWith('agenda.html')) {
        formAgenda.addEventListener('submit', salvarAgendamento);

        btnCancelar.addEventListener('click', cancelarAgendamento);
     }   
});

export async function proximosCompromissos(elementoDestinoId) {    
    const agenda = await carregarAgenda() 
    const agendaFiltrada = agenda
        .filter(compromisso => {
            const [dia, mes, ano] = compromisso.Data.split('/');
            const dataCompromisso = new Date(`${ano}-${mes}-${dia}T00:00:00`);
            return dataCompromisso > new Date(); 
        })
        .sort((a, b) => {
            const [diaA, mesA, anoA] = a.Data.split('/');
            const [diaB, mesB, anoB] = b.Data.split('/');
            const dataA = new Date(`${anoA}-${mesA}-${diaA}T00:00:00`);
            const dataB = new Date(`${anoB}-${mesB}-${diaB}T00:00:00`);
            return dataA - dataB; // crescente
        })
        .slice(0, 13);
        
    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";
        agendaFiltrada.forEach(compromisso => {
            elementoDestino.innerHTML += 
            `            
               <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${compromisso.Titulo}</h5>
                    <small>${calculaTempoData(compromisso.Data)}</small>
                    </div>
                    <small class="badge text-bg-info">${compromisso.Categoria}</small>
                </a>
            `;
        });
    }
};

async function exibirAgenda() {
    const agenda = await carregarAgenda() 
    const linhaTabela = document.getElementById('linhas');
    if (!linhaTabela) return;

    linhaTabela.innerHTML = ''; 

    if ($.fn.DataTable.isDataTable('.datatable')) {
    $('.datatable').DataTable().clear().destroy(); 
    }    

    const listaOrdenada = agenda
        .sort((a, b) => {
            const [diaA, mesA, anoA] = a.Data.split('/');
            const [diaB, mesB, anoB] = b.Data.split('/');
            const dataA = new Date(`${anoA}-${mesA}-${diaA}T00:00:00`);
            const dataB = new Date(`${anoB}-${mesB}-${diaB}T00:00:00`);
            return dataA - dataB; 
        })             
           
        listaOrdenada.forEach(compromisso => {
            const tr = document.createElement('tr')
            const th = document.createElement('th')
            th.textContent = compromisso.id
            th.setAttribute('scope', 'row')

            const tdTitulo = document.createElement('td')
            tdTitulo.textContent = compromisso.Titulo

            const tdStatus = document.createElement('td')
            tdStatus.textContent = compromisso.Status
            tdStatus.classList.add('text-center')

            const tdCategoria = document.createElement('td')
            tdCategoria.textContent = compromisso.Categoria
            tdCategoria.classList.add('text-center')

            const tdTipo = document.createElement('td')
            tdTipo.textContent = compromisso.Tipo
            tdTipo.classList.add('text-center')

            const tdData = document.createElement('td')  
            tdData.textContent = compromisso.Data

            const tdBtnEditar = document.createElement('td')
            const tdBtnExcluir = document.createElement('td')

            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn', 'btn-primary')
            btnEditar.onclick = () => preencherFormulario(compromisso.id)

            const iconeEditar = document.createElement('i')
            iconeEditar.classList.add('bi', 'bi-pencil-fill')
            iconeEditar.setAttribute ('id', 'editar-agenda')

            const btnExcluir = document.createElement('button')
            btnExcluir.classList.add('btn', 'btn-danger')        
            btnExcluir.onclick = async () => {
                try {
                    await api.excluirDados(compromisso.id, endpoint)
                } catch(error) {
                    alert('Erro ao excluir agendamento!')
                }
        }

        const iconeExcluir = document.createElement('i')
        iconeExcluir.classList.add('bi', 'bi-trash')
        iconeExcluir.setAttribute('id','excluir-agenda')

        btnEditar.appendChild(iconeEditar)
        btnExcluir.appendChild(iconeExcluir)
        tdBtnEditar.appendChild(btnEditar)
        tdBtnExcluir.appendChild(btnExcluir)
        tr.appendChild(th)
        tr.appendChild(tdTitulo)
        tr.appendChild(tdStatus)
        tr.appendChild(tdCategoria)
        tr.appendChild(tdTipo)
        tr.appendChild(tdData)
        tr.appendChild(tdBtnEditar)
        tr.appendChild(tdBtnExcluir)

        linhaTabela.appendChild(tr)
    });
    
    document.dispatchEvent(new Event('Renderizado'));
};

function gerarID() {
    const ids = agendaConvertida.map(c => Number(c.id));
    const maiorId = Math.max(0, ...ids);
    return maiorId + 1
};

async function salvarAgendamento(event) {
    event.preventDefault()

    const idInput = document.getElementById('id-adicionar').value;
    const titulo = document.getElementById('titulo-adicionar').value;
    const data = document.getElementById('data-adicionar').value;
    const categoria = document.getElementById('categoria-adicionar').value;
    const tipo = document.getElementById('tipo-adicionar').value;
    const status = document.getElementById('status-adicionar').value;
    const dataConvertida = converteDataUTC(data);

    const novoId = idInput ? Number(idInput) : gerarID(); // Garante número

    const agendamento = {
        id: novoId.toString(),
        Titulo: titulo,
        Status: status,
        Categoria: categoria,
        Tipo: tipo,
        Data: dataConvertida
    };

    try {
        if (idInput) {
            await api.atualizarDados(agendamento, endpoint);
        } else {
            await api.salvarDados(agendamento, endpoint);
        }
        listarTarefas();
    } catch(error) {
        alert('Erro ao salvar agendamento!' + error.message);
    }
};

function cancelarAgendamento() {
  formAgenda.reset();
};

async function preencherFormulario(agendamentoId) {        
    const agendamento = await api.buscarDadosPorId(agendamentoId, endpoint)

    if (agendamento) {
        document.getElementById('id-adicionar').value = agendamento.id
        document.getElementById('titulo-adicionar').value = agendamento.Titulo
        document.getElementById('data-adicionar').value = new Date(agendamento.Data).toISOString().slice(0, 16);
        document.getElementById('categoria-adicionar').value =agendamento.Categoria
        document.getElementById('tipo-adicionar').value = agendamento.Tipo
        document.getElementById('status-adicionar').value = agendamento.Status
    } else {
        alert('Agendamento não encontrado!');
    }
};

export function criarCalendario() {
    let dataAtual = new Date();
    let mes = dataAtual.getMonth();
    let ano = dataAtual.getFullYear();    
    
    const divCabecalhoContainer = document.createElement('div');
    divCabecalhoContainer.classList.add('cal-month', 'd-flex', 'justify-content-between');

    const divCabecalho = document.createElement('div');
    divCabecalho.classList.add('cal-month', 'd-flex', 'justify-content-evenly', 'align-items-center');
    divCabecalho.id = 'calendario-cabecalho';
    
    const btnAnterior = document.createElement('button');
    btnAnterior.classList.add('btn');   
    btnAnterior.title = 'Anterior';
    btnAnterior.id = 'botao-anterior';
    btnAnterior.onclick = () => {
            mes--;
        if (mes < 0) {
            mes = 11;
            ano--;
        }
        dataAtual = new Date(ano, mes);
        h4MesAno.textContent = `${dataAtual.toLocaleString('pt-BR', { month: 'long' })} ${ano}`;
        preencherCalendario(mes, ano);
    };

    const iconAnterior = document.createElement('i');
    iconAnterior.classList.add('bi', 'bi-caret-left');  

    const h4MesAno = document.createElement('h4');
    h4MesAno.classList.add('cal-month-name', 'text-center', 'text-uppercase');
    h4MesAno.id = 'mes-ano';        
    h4MesAno.textContent = `${dataAtual.toLocaleString('pt-BR', { month: 'long' })} ${ano}`;
    
    const btnProximo = document.createElement('button');
    btnProximo.classList.add('btn');
    btnProximo.title = 'Posterior';
    btnProximo.id = 'botao-proximo';
    btnProximo.onclick = () => {
        mes++;
        if (mes > 11) {
            mes = 0;
            ano++;
        }
        dataAtual = new Date(ano, mes);        
        h4MesAno.textContent = `${dataAtual.toLocaleString('pt-BR', { month: 'long' })} ${ano}`;
        preencherCalendario(mes, ano);
    };

    const iconProximo = document.createElement('i');
    iconProximo.classList.add('bi', 'bi-caret-right');

    const divAcoes = document.createElement('div');
    divAcoes.classList.add('d-flex', 'justify-content-between');

    const btnPesquisar = document.createElement('button');
    btnPesquisar.classList.add('btn');
    btnPesquisar.title = 'Pesquisar';
    btnPesquisar.id = 'pesquisar-evento';

    const iconPesquisar = document.createElement('i');
    iconPesquisar.classList.add('bi', 'bi-search');

    const btnAdicionar = document.createElement('button');
    btnAdicionar.classList.add('btn');  
    btnAdicionar.title = 'Adicionar Evento';
    btnAdicionar.id = 'adicionar-evento';

    const iconAdicionar = document.createElement('i');
    iconAdicionar.classList.add('bi', 'bi-plus-square');

    const btnConfiguracoes = document.createElement('button');
    btnConfiguracoes.classList.add('btn');  
    btnConfiguracoes.title = 'Configurações';
    btnConfiguracoes.id = 'configuracao-calendario';

    const iconConfiguracoes = document.createElement('i');
    iconConfiguracoes.classList.add('bi', 'bi-three-dots');

    // Montando a estrutura do cabeçalho
    btnAnterior.appendChild(iconAnterior);
    btnProximo.appendChild(iconProximo);
    btnPesquisar.appendChild(iconPesquisar);
    btnAdicionar.appendChild(iconAdicionar);
    btnConfiguracoes.appendChild(iconConfiguracoes);
    divCabecalho.appendChild(btnAnterior);
    divCabecalho.appendChild(h4MesAno);
    divCabecalho.appendChild(btnProximo);
    divAcoes.appendChild(btnPesquisar);
    divAcoes.appendChild(btnAdicionar);
    divAcoes.appendChild(btnConfiguracoes);
    divCabecalhoContainer.appendChild(divCabecalho);
    divCabecalhoContainer.appendChild(divAcoes);
    calendarioContainer.appendChild(divCabecalhoContainer);

    //Cria semanas do calendário
    const divSemanaContainer = document.createElement('div');
    divSemanaContainer.classList.add('calendario-semana');
    const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    diasDaSemana.forEach(dia => {
        const divDia = document.createElement('div');
        divDia.classList.add('col');
        divDia.textContent = dia;
        divSemanaContainer.appendChild(divDia);
    });
    calendarioContainer.appendChild(divSemanaContainer);
    
    preencherCalendario(mes, ano);
}

function preencherCalendario(mes, ano) {
    const divAntigo = document.getElementById('calendario-dias');
    if (divAntigo) {
        divAntigo.remove();
    }

    // Cria os dias do mês  
    const primeiroDia = new Date(ano, mes).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    const divDiasContainer = document.createElement('div');
    divDiasContainer.classList.add('calendario-dias');
    divDiasContainer.id = 'calendario-dias';
      
    for (let i = 0; i < primeiroDia; i++) {
        const divHojeVazio = document.createElement('div');
        divHojeVazio.classList.add('calendario-hoje');
        divDiasContainer.appendChild(divHojeVazio);
    }
    calendarioContainer.appendChild(divDiasContainer);

    //divDiasContainer.innerHTML = ''; // Limpa os dias anteriores
    // Preenche os dias do mês
    for (let i = 1; i <= totalDias; i++) {
        const isToday = i === new Date().getDate() &&
                        mes === new Date().getMonth() &&
                        ano === new Date().getFullYear();

        const agendaFiltrada = agendaConvertida.filter(compromisso => {
            const [diaComp, mesComp, anoComp] = compromisso.Data.split('/');
            return (
                parseInt(diaComp) === i &&
                parseInt(mesComp) === mes + 1 &&
                parseInt(anoComp) === ano
            );
        });

        
        if (agendaFiltrada.length > 0) {
            const divHojeContainer = document.createElement('div');
            divHojeContainer.classList.add('calendario-hoje');

            const divDataCompromisso = document.createElement('div');
            divDataCompromisso.classList.add('calendario-data-compromisso');
            divDataCompromisso.textContent = i;
            
            const divCompromisso = document.createElement('div');
            divCompromisso.classList.add('compromissos-dia');  

            agendaFiltrada.forEach(compromisso => {
                const divTitulo = document.createElement('div');
                divTitulo.classList.add('titulo-compromisso');
                divTitulo.textContent = compromisso.Titulo;

                const spanCategoria = document.createElement('span');
                spanCategoria.classList.add('badge', 'text-bg-info');
                spanCategoria.textContent = compromisso.Categoria;

                const spanStatus = document.createElement('span');
                spanStatus.classList.add('badge', 'text-bg-success');
                spanStatus.textContent = compromisso.Status;

                divCompromisso.appendChild(divTitulo);
                divCompromisso.appendChild(spanCategoria);
                divCompromisso.appendChild(spanStatus);            
            });  
            divHojeContainer.appendChild(divDataCompromisso);
            divHojeContainer.appendChild(divCompromisso);
            divDiasContainer.appendChild(divHojeContainer);
        } else {
            const divHoje = document.createElement('div');
            divHoje.classList.add('calendario-hoje');

            const divData = document.createElement('div');
            divData.classList.add('calendario-data');
            divData.textContent = i;
            divHoje.appendChild(divData);
            divDiasContainer.appendChild(divHoje);
            calendarioContainer.appendChild(divDiasContainer);
        }
    }
}
exibirAgenda()