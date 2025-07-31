import { calculaTempoData } from "./metodoData.js";
import api from './metodoApi.js'

let catalogo = [];
let catalogoConvertido = [];

const endpoint = 'catalogo';
const linhaTabela = document.getElementById('linhas');

export async function carregarCatalogo() {
    catalogo = await api.buscarDados(endpoint);
    
    catalogoConvertido = catalogo.map(titulo => {
        return {
            ...titulo,
            Inicio: new Date(titulo.Inicio).toLocaleDateString('pt-BR'),
            Fim: new Date(titulo.Fim).toLocaleDateString('pt-BR'),
            Adicao: new Date(titulo.Adicao).toLocaleDateString('pt-BR')
        };
    });
    return catalogoConvertido;
};

//exibe estatisticas em tvlist.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('tvlist.html')) {
        //carregarTvList().then(() => {
            const cards = document.querySelectorAll('.card');
            const linhas = document.querySelectorAll('.row');
            const colunas = document.querySelectorAll('.col');

            linhas.forEach(linha => {
                if (linha.dataset.filtro === 'recentes') {
                    adicionadosRecentemente(linha.id)
                }
            });

             colunas.forEach(coluna => {
                    //Estatisticas
                    if (coluna.dataset.filtro === 'estatisticas') {
                        const tipo = coluna.dataset.tipo ;
                        estatistica(tipo, coluna.id)
                    }
            });

            cards.forEach(card => {
                const header = card.querySelector('.card-header');
                const lista = card.querySelector('ul');
                const title = card.querySelector('.card-title');
                const body = card.querySelector('.card-body');

                if (header && lista) {
                    // Filtro por Status
                    if (card.dataset.filtro === 'status') {
                        const status = card.dataset.status || header.textContent.trim();
                        filtrarStatus(status, lista.id);
                    }

                    // Filtro por Tipo
                    if (card.dataset.filtro === 'tipo') {
                        const tipo = card.dataset.tipo || header.textContent.trim();
                        filtrarTipo(tipo, lista.id);
                    }

                    // Filtro top geral
                    if (card.dataset.filtro === 'Geral') {
                        topGeral(lista.id);
                    }
                } else if (body && title) {
                    //Contagem por Geral
                   if (card.dataset.filtro === 'contagem-geral') {
                        const status = card.dataset.status || title.textContent.trim();
                        contagemGeral(status, body.id);
                    }
                     //Contagem por status
                   if (card.dataset.filtro === 'contagem-status') {
                        const status = card.dataset.status || title.textContent.trim();
                        contagemStatus(status, body.id);
                    } 
                    //Contagem por tipo
                   if (card.dataset.filtro === 'contagem-tipo') {
                        const tipo = card.dataset.contagem || title.textContent.trim();
                        contagemTipo(tipo, body.id);
                    }
                } 
            });           
       // });
    }
});

async function estatistica(tipo, elementoDestinoId) {
    const catalogo = await carregarCatalogo();
    const catalogoEstatisticas = catalogo.filter(titulo => titulo.Tipo === tipo);    
    const total = catalogoEstatisticas.filter(titulo => titulo.Tipo === tipo).length;
    const Dias = catalogoEstatisticas.reduce((acc, titulo) => acc + (titulo.Dias || 0), 0);
    const reassistidos = catalogoEstatisticas.reduce((acc, titulo) => acc + (titulo.Reassistindo || 0), 0);
    const totalEpisodios = catalogoEstatisticas.reduce((acc, titulo) => acc + (titulo.Episodios || 0), 0);
    const assistindo = catalogoEstatisticas.filter(titulo => titulo.Status === 'Assistindo').length;
    const completado = catalogoEstatisticas.filter(titulo => titulo.Status === 'Completado').length;
    const dropped = catalogoEstatisticas.filter(titulo => titulo.Status === 'Dropped').length;
    const planejado = catalogoEstatisticas.filter(titulo => titulo.Status === 'Planejado').length;
    const emEspera = catalogoEstatisticas.filter(titulo => titulo.Status === 'Em-Espera').length;
    
    // Média de pontuação 
    const pontuacoes = catalogoEstatisticas
        .map(titulo => titulo.Score)
        .filter(p => typeof p === 'number' && !isNaN(p));

    const mediaPontuacao = pontuacoes.length > 0
        ? (pontuacoes.reduce((acc, p) => acc + p, 0) / pontuacoes.length)
        : 0;
        
    const elementoDestino = document.getElementById(elementoDestinoId);

     if (elementoDestino) {
        elementoDestino.innerHTML = "";
            elementoDestino.innerHTML += 
            `
                <div class="card">
                    <div class="card-header">
                            Estatísticas de ${tipo}
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="card-title">Dias: ${Dias}</p>
                            <p class="card-text">Pontuação Média: ${mediaPontuacao.toFixed(1)}</p>
                        </div>
                        <div class="progress-stacked">
                            <div class="progress" role="progressbar" aria-label="Completado" aria-valuenow="${(completado/100)*total}" aria-valuemin="0" aria-valuemax="100" style="width: ${(completado/100)*total}%">
                                <div class="progress-bar"></div>
                            </div>
                            <div class="progress" role="progressbar" aria-label="Assistido" aria-valuenow="${(assistindo/100)*total}" aria-valuemin="0" aria-valuemax="100" style="width: ${(assistindo/100)*total}%">
                                <div class="progress-bar bg-success"></div>
                            </div>
                            <div class="progress" role="progressbar" aria-label="Dropped" aria-valuenow="${(dropped/100)*total}" aria-valuemin="0" aria-valuemax="100" style="width: ${(dropped/100)*total}%">
                                <div class="progress-bar bg-danger"></div>
                            </div>
                            <div class="progress" role="progressbar" aria-label="EmEspera" aria-valuenow="${(emEspera/100)*total}" aria-valuemin="0" aria-valuemax="100" style="width: ${(emEspera/100)*total}%">
                                <div class="progress-bar bg-warning"></div>
                            </div>
                            <div class="progress" role="progressbar" aria-label="Planejado" aria-valuenow="${(planejado/100)*total}" aria-valuemin="0" aria-valuemax="100" style="width: ${(planejado/100)*total}%">
                                <div class="progress-bar bg-info"></div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-start mt-2">
                            <ul class="list-unstyled mb-0"> 
                                <li>
                                    <a class="dropdown-item d-flex align-items-center gap-2 py-1" href="#"> 
                                        <span class="d-inline-block bg-success rounded-circle p-1"></span>
                                        Assistindo: ${assistindo}
                                    </a>
                                </li> 
                                <li>
                                    <a class="dropdown-item d-flex align-items-center gap-2 py-1" href="#">
                                        <span class="d-inline-block bg-primary rounded-circle p-1"></span>
                                        Completo: ${completado}
                                    </a>
                                </li> 
                                <li>
                                    <a class="dropdown-item d-flex align-items-center gap-2 py-1" href="#"> 
                                    <span class="d-inline-block bg-danger rounded-circle p-1"></span>
                                        Dropped: ${dropped}
                                    </a>
                                </li> 
                                <li>
                                    <a class="dropdown-item d-flex align-items-center gap-2 py-1" href="#"> 
                                    <span class="d-inline-block bg-warning rounded-circle p-1"></span>
                                        Em Espera: ${emEspera}
                                    </a>
                                </li>  
                                <li>
                                    <a class="dropdown-item d-flex align-items-center gap-2 py-1" href="#"> 
                                    <span class="d-inline-block bg-info rounded-circle p-1"></span>
                                        Planejado: ${planejado}
                                    </a>
                                </li> 
                            </ul>

                            <ul class="list-unstyled mb-0"> 
                                <li>
                                    Total: ${total}
                                </li> 
                                <li>
                                    Reassitindos: ${reassistidos}
                                </li> 
                                <li>
                                    Episódios: ${totalEpisodios}
                                </li> 
                            </ul>
                        </div>
                    </div>
                </div>
            `;
    }        
};

async function contagemGeral(status, elementoDestinoId) {   
    const catalogo = await carregarCatalogo();
    const total = catalogo.length;
    const totalDias = catalogo.reduce((acc, titulo) => acc + (titulo.Dias || 0), 0);
    const totalEpisodios = catalogo.reduce((acc, titulo) => acc + (titulo.Episodios || 0), 0);
    const totalAssistidos = catalogo.reduce((acc, titulo) => acc + (titulo.Assistidos || 0), 0); 
    const porcentagem = totalAssistidos/totalEpisodios*100;   
    let geral = 0;

    // Média de pontuação 
    const pontuacoes = catalogo
        .map(titulo => titulo.Score)
        .filter(p => typeof p === 'number' && !isNaN(p));

    const mediaPontuacao = pontuacoes.length > 0
        ? (pontuacoes.reduce((acc, p) => acc + p, 0) / pontuacoes.length)
        : 0;

    if (status === 'Progresso') {
        geral = totalAssistidos
    } else if (status === 'Total') {
        geral = total
    } else if (status === 'Pontuacao') {
        geral = mediaPontuacao.toFixed(1)
    } else if (status === 'Assistidos') {
        geral = totalAssistidos
    } else if (status === 'Episodios') {
        geral = totalEpisodios
    } else if (status === 'Dias') {
        geral = totalDias
    } 

    const elementoDestino = document.getElementById(elementoDestinoId);

    if (elementoDestino) {

        if (status === 'Progresso') {
            const h6Card = document.createElement('h6');
            h6Card.classList.add('card-subtitle', 'mb-2', 'text-body-secondary');
            h6Card.textContent = `${geral} de ${totalEpisodios}`;
            elementoDestino.appendChild(h6Card);

            // Exibe a barra de progresso
            const divProgressoContainer = document.createElement('div');
            divProgressoContainer.classList.add('progress');
            divProgressoContainer.setAttribute('role', 'progressbar');
            divProgressoContainer.setAttribute('aria-label', 'Success example');
            divProgressoContainer.setAttribute('aria-valuenow', porcentagem.toFixed(1));
            divProgressoContainer.setAttribute('aria-valuemin', '0');
            divProgressoContainer.setAttribute('aria-valuemax', '100');

            const divProgressoBarra = document.createElement('div');
            divProgressoBarra.classList.add('progress-bar', 'text-bg-success');
            divProgressoBarra.style.width = `${porcentagem.toFixed(1)}%`;
            divProgressoBarra.textContent = `${porcentagem.toFixed(1)}%`;
            divProgressoContainer.appendChild(divProgressoBarra);
            elementoDestino.appendChild(divProgressoContainer);

        } else {
            const h6Card = document.createElement('h6');
            h6Card.classList.add('card-subtitle', 'mb-2', 'text-body-secondary');
            h6Card.textContent = geral;
            elementoDestino.appendChild(h6Card);
        }       
    }        
};

async function contagemTipo(tipo, elementoDestinoId) {
    const catalogo = await carregarCatalogo();
    const catalogoTipo = catalogo.filter(titulo => titulo.Tipo === tipo).length;
    const elementoDestino = document.getElementById(elementoDestinoId);

     if (elementoDestino) {
        const h6Card = document.createElement('h6');
        h6Card.classList.add('card-subtitle', 'mb-2', 'text-body-secondary');
        h6Card.textContent = catalogoTipo;
        elementoDestino.appendChild(h6Card);        
    }        
};

async function contagemStatus(status, elementoDestinoId) {
    const catalogo = await carregarCatalogo();
    const catalogoStatus = catalogo.filter(titulo => titulo.Status === status).length;
    const elementoDestino = document.getElementById(elementoDestinoId);

     if (elementoDestino) {
        const h6Card = document.createElement('h6');
        h6Card.classList.add('card-subtitle', 'mb-2', 'text-body-secondary');
        h6Card.textContent = catalogoStatus;
        elementoDestino.appendChild(h6Card);
    }        
};

async function filtrarStatus(statusFiltro, elementoDestinoId) {
    const catalogo = await carregarCatalogo();
    const catalogoFiltrado = catalogo.filter(titulo => titulo.Status === statusFiltro)
                                    .slice(0, 4);

    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";
        catalogoFiltrado.forEach(titulo => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'gap-2', 'p-0');

            const imgCapa = document.createElement('img');
            imgCapa.src = titulo.Capa
            imgCapa.alt = titulo.Titulo;
            imgCapa.width = 60;
            imgCapa.height = 80;
            imgCapa.classList.add('flex-shrink-0');

            const divInfo = document.createElement('div');
            divInfo.classList.add('d-flex', 'gap-2', 'w-100', 'justify-content-between', 'align-items-center');

            const divTitulo = document.createElement('div');
            divTitulo.classList.add('d-flex', 'flex-column', 'gap-1');

            const h6Titulo = document.createElement('h6');
            h6Titulo.classList.add('mb-0');
            h6Titulo.textContent = titulo.Titulo;

            const divProgresso = document.createElement('div');
            divProgresso.classList.add('progress');
            divProgresso.setAttribute('role', 'progressbar');
            divProgresso.setAttribute('aria-label', 'Progresso');
            divProgresso.setAttribute('aria-valuenow', titulo.Progresso * 100);
            divProgresso.setAttribute('aria-valuemin', '0');
            divProgresso.setAttribute('aria-valuemax', '100');

            const divBarraProgresso = document.createElement('div');
            divBarraProgresso.classList.add('progress-bar');
            divBarraProgresso.style.width = `${titulo.Progresso * 100}%`;
            divBarraProgresso.textContent = `${parseInt(titulo.Progresso * 100)}%`;

            const smallDataAdicao = document.createElement('small');
            smallDataAdicao.classList.add('opacity-50', 'text-nowrap');     
            smallDataAdicao.textContent = calculaTempoData(titulo.Adicao);

            divTitulo.appendChild(h6Titulo);
            divProgresso.appendChild(divBarraProgresso);
            divInfo.appendChild(divTitulo);
            divInfo.appendChild(divProgresso);
            li.appendChild(imgCapa);
            li.appendChild(divInfo);
            li.appendChild(smallDataAdicao);
            elementoDestino.appendChild(li);
            
        });
    }
};

async function filtrarTipo(tipoFiltro, elementoDestinoId) {
    const catalogo = await carregarCatalogo();
    const catalogoFiltrado = catalogo.filter(titulo => titulo.Tipo === tipoFiltro)
                                                .sort((a, b) => b.Score - a.Score)
                                                .slice(0, 4);

    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";
        catalogoFiltrado.forEach(titulo => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'gap-2', 'p-0');

            const imgCapa = document.createElement('img');
            imgCapa.src = titulo.Capa;
            imgCapa.alt = titulo.Titulo;
            imgCapa.width = 60;
            imgCapa.height = 80;
            imgCapa.classList.add('flex-shrink-0');

            const divTituloContainer = document.createElement('div');
            divTituloContainer.classList.add('ms-2', 'me-auto');

            const divTitulo = document.createElement('div');
            divTitulo.classList.add('fw-bold');
            divTitulo.textContent = titulo.Titulo;

            const spanScore = document.createElement('span');
            spanScore.classList.add('badge', 'text-bg-primary', 'rounded-pill');
            spanScore.textContent = titulo.Score;

            divTituloContainer.appendChild(divTitulo);
            li.appendChild(imgCapa);
            li.appendChild(divTituloContainer);
            li.appendChild(spanScore);
            elementoDestino.appendChild(li);
            
        });
    }
};

async function topGeral(elementoDestinoId) {
    const catalogo = await carregarCatalogo();
    const catalogoFiltrado = catalogo.sort((a, b) => b.Score - a.Score)
                                    .slice(0, 4);

    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";
        catalogoFiltrado.forEach(titulo => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'gap-2', 'p-0');

            const imgCapa = document.createElement('img');
            imgCapa.src = titulo.Capa;
            imgCapa.alt = titulo.Titulo;
            imgCapa.width = 60;
            imgCapa.height = 80;
            imgCapa.classList.add('flex-shrink-0');

            const divInfo = document.createElement('div');
            divInfo.classList.add('ms-2', 'me-auto');

            const divTitulo = document.createElement('div');
            divTitulo.classList.add('fw-bold');

            divTitulo.textContent = titulo.Titulo;
            const spanScore = document.createElement('span');

            spanScore.classList.add('badge', 'text-bg-primary', 'rounded-pill');
            spanScore.textContent = titulo.Score;

            divInfo.appendChild(divTitulo);
            li.appendChild(imgCapa);
            li.appendChild(divInfo);
            li.appendChild(spanScore);
            elementoDestino.appendChild(li);
        });
    }
};

async function adicionadosRecentemente(elementoDestinoId) {
    const catalogo = await carregarCatalogo();
    const catalogoFiltrado = catalogo
    .sort((a, b) => {
        const dataA = new Date(a.Adicao.split('/').reverse().join('/'));
        const dataB = new Date(b.Adicao.split('/').reverse().join('/'));
        return dataB - dataA;
    })
    .slice(0, 3);

    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";
        catalogoFiltrado.forEach(titulo => {
            elementoDestino.innerHTML += 
            `            
                <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg m-1" style="background-color: #fff;">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h4 class="pt-5 mt-5 mb-2 display-7 lh-1 fw-bold">${titulo.Titulo}</h4>
                            <ul class="d-flex justify-content-between align-items-lg-center gap-3 list-unstyled mt-auto">
                                <li class="w-75">
                                    <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar" style="width: ${titulo.Progresso*100}%">${parseInt(titulo.Progresso*100)}%</div>
                                    </div>
                                </li>
                                <li class="d-flex gap-3 align-items-center"> 
                                    <i class="bi bi-calendar3"></i> <small>${titulo.Adicao}</small></li>
                            </ul>
                    </div>
                </div>
            `;
        });
    }
};

async function listarCatalogo() {    
    const catalogo = await carregarCatalogo();
    if (!linhaTabela) return;

    linhaTabela.innerHTML = ''; 

    if ($.fn.DataTable.isDataTable('.datatable')) {
    $('.datatable').DataTable().clear().destroy(); 
    }

    catalogo.forEach(titulo => {
        const tr = document.createElement('tr');
        const thId = document.createElement('th');  
        thId.scope = 'row';
        thId.textContent = titulo.id;

        const tdTitulo = document.createElement('td');
        tdTitulo.textContent = titulo.Titulo;

        const tdTipo = document.createElement('td');
        tdTipo.classList.add('text-center');
        tdTipo.textContent = titulo.Tipo;

        const tdStatus = document.createElement('td');
        tdStatus.classList.add('text-center');
        tdStatus.textContent = titulo.Status;

        const tdOnde = document.createElement('td');
        tdOnde.classList.add('text-center');
        tdOnde.textContent = titulo.Onde;

        const tdInicio = document.createElement('td');
        tdInicio.textContent = titulo.Inicio;

        const tdFim = document.createElement('td');
        tdFim.textContent = titulo.Fim;

        const tdEpisodios = document.createElement('td');
        tdEpisodios.classList.add('text-center');
        tdEpisodios.textContent = titulo.Episodios;

        const tdAssistidos = document.createElement('td');
        tdAssistidos.classList.add('text-center');
        tdAssistidos.textContent = titulo.Assistidos;

        const tdTemporadas = document.createElement('td');
        tdTemporadas.classList.add('text-center');
        tdTemporadas.textContent = titulo.Temporadas;

        const tdScore = document.createElement('td');
        tdScore.classList.add('text-center');
        tdScore.textContent = titulo.Score;

        const tdDias = document.createElement('td');
        tdDias.classList.add('text-center');
        tdDias.textContent = titulo.Dias;
        tr.appendChild(thId);
        tr.appendChild(tdTitulo);
        tr.appendChild(tdTipo);
        tr.appendChild(tdStatus);
        tr.appendChild(tdOnde);
        tr.appendChild(tdInicio);
        tr.appendChild(tdFim);
        tr.appendChild(tdEpisodios);
        tr.appendChild(tdAssistidos);
        tr.appendChild(tdTemporadas);
        tr.appendChild(tdScore);
        tr.appendChild(tdDias);
        linhaTabela.appendChild(tr);
        
    });

    // Dispara DataTable
    document.dispatchEvent(new Event('Renderizado'));
};

export async function assistindoPrincipal(statusFiltro, elementoDestinoId) {
    const catalogo = await carregarCatalogo();
    const catalogoFiltrado = catalogo.filter(titulo => titulo.Status === statusFiltro)
                                    .slice(0, 4);

    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";

         if (!catalogoFiltrado.length == 0) {
            catalogoFiltrado.forEach(titulo => {
                elementoDestino.innerHTML += 
                `
                <div class="card shadow-sm"> 
                    <svg aria-label="Placeholder: Thumbnail" class="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c"></rect>
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                    </svg>
                    <div class="card-body" id="principal-assistindo">
                        <h5 class="card-title">${titulo.Titulo}</h5>
                        <div class="d-flex justify-content-between align-items-center"> 
                            <span class="badge text-bg-info">${titulo.Tipo}</span>
                        </div>
                        <div class="progress mt-2" role="progressbar" aria-label="Progresso Assistindo" aria-valuenow="${titulo.Progresso}" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar bg-success" style="width: ${titulo.Progresso*100}%">${titulo.Progresso*100}%</div>
                        </div>
                    </div>
                </div>                
                `;
            });
        } else {
            const pMensagem = document.createElement('p');
            pMensagem.classList.add('mensagem-curso');
            pMensagem.textContent = 'Não há títulos em andamento no momento.';
            elementoDestino.appendChild(pMensagem);
        } 
    }
};

listarCatalogo()