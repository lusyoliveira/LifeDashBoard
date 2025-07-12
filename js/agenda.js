import { calculaTempoData, converteDataUTC } from "./metodoData.js";
import api from './metodoApi.js'

let agenda = [];
let agendaConvertida = [];

const endpoint = 'agenda';

const mesAno = document.getElementById('mes-ano');
const btnCancelar = document.getElementById('cancelar-agenda');

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
    exibirAgenda(agendaConvertida)      
};

document.addEventListener('DOMContentLoaded', () => {
    carregarAgenda()

     if (window.location.pathname.endsWith('agenda.html')) {
        const formAgenda = document.getElementById('agenda-form');
        formAgenda.addEventListener('submit', salvarAgendamento);

        btnCancelar.addEventListener('click', cancelarAgendamento);
     }   
});

export function criarCalendario(mes, ano, dias) {
  const primeiroDia = new Date(ano, mes).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  dias.innerHTML = '';
  mesAno.textContent = `${new Date(ano, mes).toLocaleString('pt-BR', { month: 'long' })} ${ano}`;

  // Espaços vazios antes do primeiro dia
  for (let i = 0; i < primeiroDia; i++) {
    dias.innerHTML += `<div class="calendario-hoje"></div>`;
  }

  // Dias do mês
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
            dias.innerHTML += `
                <div class="calendario-hoje">
                    <div class="calendario-data-compromisso">${i}</div>
                    <div class="compromissos-dia">
                        ${agendaFiltrada.map(compromisso => `<div class="titulo-compromisso">${compromisso.Titulo}</div> 
                                                                <span class="badge text-bg-info">${compromisso.Categoria}</span><span class="badge text-bg-success">${compromisso.Status}</span>`).join('')}
                    </div>
                </div>
            `;
        } else {
            dias.innerHTML += `<div class="calendario-hoje"><div class="calendario-data">${i}</div></div>`;
    }
  }
};

export function proximosCompromissos(elementoDestinoId) {
    const agendaFiltrada = agendaConvertida
        .filter(compromisso => {
            const [dia, mes, ano] = compromisso.Data.split('/');
            const dataCompromisso = new Date(`${ano}-${mes}-${dia}T00:00:00`);
            return dataCompromisso > new Date(); // ou >= se quiser incluir o dia atual
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

function exibirAgenda(listaCompromissos) {
    const linhaTabela = document.getElementById('linhas');
    if (!linhaTabela) return;

    linhaTabela.innerHTML = ''; 

    if ($.fn.DataTable.isDataTable('.datatable')) {
    $('.datatable').DataTable().clear().destroy(); 
    }    

    listaCompromissos.forEach(compromisso => {
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

            debugger
            try {
                await api.excluirDados(compromisso.id, endpoint)
                carregarAgenda()
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

    // Dispara DataTable
    document.dispatchEvent(new Event('Renderizado'));
};

function gerarID() {
    const ids = agendaConvertida.map(c => Number(c.id));
    const maiorId = Math.max(0, ...ids);
    return maiorId + 1
};

async function salvarAgendamento(event) {
    event.preventDefault()

    let id = document.getElementById('id-adicionar').value
    const titulo = document.getElementById('titulo-adicionar').value
    const data = document.getElementById('data-adicionar').value
    const categoria = document.getElementById('categoria-adicionar').value
    const tipo = document.getElementById('tipo-adicionar').value
    const status = document.getElementById('status-adicionar').value
    
    const dataConvertida =  converteDataUTC(data)

    try {
        if (id) {
            await api.atualizarDados({ id: Number(id), 
                                        Titulo: titulo, 
                                        Status: status, 
                                        Categoria: categoria, 
                                        Tipo: tipo, 
                                        Data: dataConvertida }, endpoint)
        } else {
            id = gerarID()
            await api.salvarDados({ id: Number(id), 
                                    Titulo: titulo, 
                                    Status: status, 
                                    Categoria: categoria, 
                                    Tipo: tipo, 
                                    Data: dataConvertida }, endpoint)
        }
        carregarAgenda()
    } catch {
        alert('Erro ao salvar agendamento!')
    }
};

function cancelarAgendamento() {
  document.getElementById("agenda-form").reset();
};

async function preencherFormulario(agendamentoId) {
        debugger
        const agendamento = await api.buscarDadosPorId(agendamentoId, endpoint)

        document.getElementById('id-adicionar').value = agendamento.id
        document.getElementById('titulo-adicionar').value = agendamento.Titulo
        document.getElementById('data-adicionar').value = new Date(agendamento.Data).toISOString().slice(0, 16);
        document.getElementById('categoria-adicionar').value =agendamento.Categoria
        document.getElementById('tipo-adicionar').value = agendamento.Tipo
        document.getElementById('status-adicionar').value = agendamento.Status
};
