import { converteData, calculaTempoData } from "./metodoData.js";

let catalogo = [];
let catalogoConvertido = [];

const endpoint = './json/CatalogoTV.json';
const linhaTabela = document.getElementById('linhas');

async function buscarCatalogo() {
    const resposta = await fetch(endpoint);
    catalogo = await resposta.json();

    catalogoConvertido = catalogo.map(titulo => {
        return {
            ...titulo,
            Inicio: converteData(titulo.Inicio),
            Fim: converteData(titulo.Fim),
            Adicao: converteData(titulo.Adicao)
        };
    });
    exibirCatalogo(catalogoConvertido)
};

//exibe dados em index.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('index.html')) {
        buscarCatalogo().then(() => {
            const linhas = document.querySelectorAll('.row');          

            linhas.forEach(linha => {
                // Filtro por Status
                if (linha.dataset.filtro === 'principal') {
                    const status = linha.dataset.status;
                    assistindoPrincipal(status, linha.id);
                }  
            });           
        });
    }
});

//exibe catalogo em catalogo.html
document.addEventListener('DOMContentLoaded', () => {
    const isCatalogoPage = window.location.pathname.endsWith('catalogo.html');
    if (isCatalogoPage) {
        buscarCatalogo();
    }
});

//exibe estatisticas em tvlist.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('tvlist.html')) {
        buscarCatalogo().then(() => {
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

           
        });
    }
});

function estatistica(tipo, elementoDestinoId) {
    const catalogoEstatisticas = catalogoConvertido.filter(titulo => titulo.Tipo === tipo);    
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

function contagemGeral(status, elementoDestinoId) {   
    const total = catalogoConvertido.length;
    const totalDias = catalogoConvertido.reduce((acc, titulo) => acc + (titulo.Dias || 0), 0);
    const totalEpisodios = catalogoConvertido.reduce((acc, titulo) => acc + (titulo.Episodios || 0), 0);
    const totalAssistidos = catalogoConvertido.reduce((acc, titulo) => acc + (titulo.Assistidos || 0), 0); 
    const porcentagem = totalAssistidos/totalEpisodios*100   
    let geral = 0;

    // Média de pontuação 
    const pontuacoes = catalogoConvertido
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
            elementoDestino.innerHTML = "";
            elementoDestino.innerHTML += 
            `
                <h5 class="card-title">${status}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${geral} de ${totalEpisodios}</h6>

                <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar text-bg-success" style="width: ${porcentagem.toFixed(1)}%">${porcentagem.toFixed(1)}%</div>
                </div>            
            `;
        } else {
            elementoDestino.innerHTML = "";
            elementoDestino.innerHTML += 
            `
                <h5 class="card-title">${status}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${geral}</h6>      
            `;
        }

       
    }        
};

function contagemTipo(tipo, elementoDestinoId) {
    const catalogoTipo = catalogoConvertido.filter(titulo => titulo.Tipo === tipo).length;
    const elementoDestino = document.getElementById(elementoDestinoId);

     if (elementoDestino) {
        elementoDestino.innerHTML = "";
            elementoDestino.innerHTML += 
            `
                <h5 class="card-title">${tipo}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${catalogoTipo}</h6>
            `;
    }        
};

function contagemStatus(status, elementoDestinoId) {
    const catalogoStatus = catalogoConvertido.filter(titulo => titulo.Status === status).length;
    const elementoDestino = document.getElementById(elementoDestinoId);

     if (elementoDestino) {
        elementoDestino.innerHTML = "";
            elementoDestino.innerHTML += 
            `
                <h5 class="card-title">${status}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${catalogoStatus}</h6>
            `;
    }        
};

function filtrarStatus(statusFiltro, elementoDestinoId) {
    const catalogoFiltrado = catalogoConvertido.filter(titulo => titulo.Status === statusFiltro)
                                    .slice(0, 4);

    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";
        catalogoFiltrado.forEach(titulo => {
            elementoDestino.innerHTML += 
            `
               <li class="list-group-item d-flex gap-2 p-0">
                    <img src="https://github.com/twbs.png" alt="" width="60" height="80" class="flex-shrink-0">
                    <div class="d-flex gap-2 w-100 justify-content-between align-items-center">
                        <div class="d-flex flex-column gap-1">
                            <h6 class="mb-0">${titulo.Titulo}</h6>
                            <div class="progress" role="progressbar" aria-label="Progresso" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar" style="width: ${titulo.Progresso*100}%">${parseInt(titulo.Progresso*100)}%</div>
                            </div>
                        </div> 
                        <small class="opacity-50 text-nowrap">${calculaTempoData(titulo.Adicao)}</small>
                    </div>
                </li>
            `;
        });
    }
};

function filtrarTipo(tipoFiltro, elementoDestinoId) {
    const catalogoFiltrado = catalogoConvertido.filter(titulo => titulo.Tipo === tipoFiltro)
                                                .sort((a, b) => b.Score - a.Score)
                                                .slice(0, 4);

    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";
        catalogoFiltrado.forEach(titulo => {
            elementoDestino.innerHTML += 
            `
               <li class="list-group-item d-flex align-items-center gap-2 p-0">
                    <img src="https://github.com/twbs.png" alt="" width="60" height="80" class="flex-shrink-0">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">${titulo.Titulo}</div>
                        
                    </div>
                    <span class="badge text-bg-primary rounded-pill">${titulo.Score}</span>
                </li>
            `;
        });
    }
};

function topGeral(elementoDestinoId) {
    const catalogoFiltrado = catalogoConvertido.sort((a, b) => b.Score - a.Score)
                                    .slice(0, 4);

    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";
        catalogoFiltrado.forEach(titulo => {
            elementoDestino.innerHTML += 
            `
               <li class="list-group-item d-flex align-items-center gap-2 p-0">
                    <img src="https://github.com/twbs.png" alt="" width="60" height="80" class="flex-shrink-0">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">${titulo.Titulo}</div>
                        
                    </div>
                    <span class="badge text-bg-primary rounded-pill">${titulo.Score}</span>
                </li>
            `;
        });
    }
};

function adicionadosRecentemente(elementoDestinoId) {
    const catalogoFiltrado = catalogoConvertido.sort((a, b) => {
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

function exibirCatalogo(listaTitulos) {
    if (!linhaTabela) return;

    linhaTabela.innerHTML = ''; // Limpa antes de adicionar

    if ($.fn.DataTable.isDataTable('.datatable')) {
    $('.datatable').DataTable().clear().destroy(); // 🧹 Limpa e remove o plugin
    }

    listaTitulos.forEach(titulo => {
        linhaTabela.innerHTML += 
        `
            <tr>
                <th scope="row">${titulo.ID}</th>
                <td>${titulo.Titulo}</td>
                <td class="text-center">${titulo.Tipo}</td>
                <td class="text-center">${titulo.Status}</td>
                <td class="text-center">${titulo.Onde}</td>
                <td>${titulo.Inicio}</td>
                <td>${titulo.Fim}</td>
                <td class="text-center">${titulo.Episodios}</td>
                <td class="text-center">${titulo.Assistidos}</td>
                <td class="text-center">${titulo.Temporadas}</td>
                <td class="text-center">${titulo.Score}</td>
                <td class="text-center">${titulo.Dias}</td>
            </tr>
        `;
    });

    // Dispara DataTable
    document.dispatchEvent(new Event('Renderizado'));
};

function assistindoPrincipal(statusFiltro, elementoDestinoId) {
    const catalogoFiltrado = catalogoConvertido.filter(titulo => titulo.Status === statusFiltro)
                                    .slice(0, 4);

    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";
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
    }
};