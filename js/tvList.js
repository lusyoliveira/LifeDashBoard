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

//exibe lista por status
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('tvlist.html')) {
        buscarCatalogo().then(() => {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                const header = card.querySelector('.card-header');
                const lista = card.querySelector('ul');

                if (header && lista) {
                    const statusTexto = header.textContent.trim();
                    filtrarStatus(statusTexto, lista.id);
                }
            });
        });
    }
});

function filtrarCatalogo() {
    const elementoStatus = document.getElementById('this.id')
    const statusAtual = elementoStatus.value
    let catalogoFiltrado = catalogo.filter(Titulo => Titulo.Status == 'Watching')
    console.table(catalogoFiltrado);
    
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
}

function exibirCatalogo(listaTitulos) {
    if (!linhaTabela) return;

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
        `
    })
}