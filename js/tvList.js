let catalogo = [];
const endpoint = './json/CatalogoTV.json';
const liCard = document.getElementById('lista-status');
const linhaTabela = document.getElementById('linhas');

async function buscarCatalogo() {
    const resposta = await fetch(endpoint);
    catalogo = await resposta.json();
    exibirCatalogo(catalogo)
}

//exibe catalogo
document.addEventListener('DOMContentLoaded', () => {
    const isCatalogoPage = window.location.pathname.endsWith('Catalogo.html');
    if (isCatalogoPage) {
        buscarCatalogo();
    }
});

//exibe adicionados recentemente
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('tvlist.html')) {
        buscarCatalogo().then(() => {
            const linhas = document.querySelectorAll('.row');

            linhas.forEach(linha => {
                const coluna = linha.querySelector('#recentes');
                if (linha.dataset.filtro === 'recentes') {
                    adicionadosRecentemente(linha.id)
                }
            })

        })
    }
})
//exibe lista nos cards
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('tvlist.html')) {
        buscarCatalogo().then(() => {
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                const header = card.querySelector('.card-header');
                const lista = card.querySelector('ul');

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

                    //Top Geral
                    // Filtro por Tipo
                    if (card.dataset.filtro === 'Geral') {
                        const tipo = card.dataset.tipo || header.textContent.trim();
                        topGeral(lista.id);
                    }
                }
            });
        });
    }
});

function filtrarCatalogo() {
    const elementoStatus = document.getElementById('this.id')
    const statusAtual = elementoStatus.value
    let catalogoFiltrado = catalogo.filter(Titulo => Titulo.Status == 'Watching')
    //console.table(catalogoFiltrado);    
}

function filtrarStatus(statusFiltro, elementoDestinoId) {
    const catalogoFiltrado = catalogo.filter(titulo => titulo.Status === statusFiltro)
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
                                <div class="progress-bar" style="width: ${titulo.Progresso*100}%">${parseInt(titulo.Progresso*100)}</div>
                            </div>
                        </div> 
                        <small class="opacity-50 text-nowrap">Ontem</small>
                    </div>
                </li>
            `;
        });
    }
}

function filtrarTipo(tipoFiltro, elementoDestinoId) {
    const catalogoFiltrado = catalogo.filter(titulo => titulo.Tipo === tipoFiltro)
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
    const catalogoFiltrado = catalogo.sort((a, b) => b.Score - a.Score)
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
    const catalogoFiltrado = catalogo.sort((a, b) => a.Adicao - b.Adicao)
                                    .slice(0, 3);

    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";
        catalogoFiltrado.forEach(titulo => {
            elementoDestino.innerHTML += 
            `            
                <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-color: #fff;">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h4 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">${titulo.Titulo}</h4>
                            <ul class="d-flex justify-content-between align-items-lg-center gap-3 list-unstyled mt-auto">
                                <li class="w-75">
                                    <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar" style="width: ${titulo.Progresso*100}%">${parseInt(titulo.Progresso*100)}</div>
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

    // 🔔 Dispara DataTable
    document.dispatchEvent(new Event('catalogoRenderizado'));
};

