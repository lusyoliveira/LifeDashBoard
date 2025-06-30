import { converteData, calculaTempoData } from "./metodoData.js";

let agenda = [];
let agendaConvertida = [];
let dataAtual = new Date();
let mesAtual = dataAtual.getMonth();
let anoAtual = dataAtual.getFullYear();

const endpoint = './json/Agenda.json';
const linhaTabela = document.getElementById('linhas');
const mesAno = document.getElementById('mes-ano');

async function buscarAgenda() {
    const resposta = await fetch(endpoint);
    agenda = await resposta.json();

    agendaConvertida = agenda.map(compromisso => {
        return {
            ...compromisso,
            Data: converteData(compromisso.Data)
        };
    });
    exibirAgenda(agendaConvertida)   
};

//exibe no index.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('index.html')) {
        buscarAgenda().then(() => {
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
            })

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
    }
});

//exibe listagem da agenda em agenda.html
document.addEventListener('DOMContentLoaded', () => {
    const isAgendaPage = window.location.pathname.endsWith('agenda.html');
    if (isAgendaPage) {
        buscarAgenda();
    }
});

function criarCalendario(mes, ano, dias) {
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

function proximosCompromissos(elementoDestinoId) {
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
    if (!linhaTabela) return;

    linhaTabela.innerHTML = ''; 

    if ($.fn.DataTable.isDataTable('.datatable')) {
    $('.datatable').DataTable().clear().destroy(); 
    }

    listaCompromissos.forEach(compromisso => {
        linhaTabela.innerHTML += 
        `
            <tr>
                <th scope="row">${compromisso.Id}</th>
                <td>${compromisso.Titulo}</td>
                <td class="text-center">${compromisso.Status}</td>
                <td class="text-center">${compromisso.Categoria}</td>
                <td>${compromisso.Tipo}</td>
                <td>${compromisso.Data}</td>
            </tr>
        `;
    });

    // Dispara DataTable
    document.dispatchEvent(new Event('Renderizado'));
};

