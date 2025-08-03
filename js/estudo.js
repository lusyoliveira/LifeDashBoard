import api from './metodoApi.js'

let cursos = [];
let cursosConvertido = [];

const endpoint = 'cursos';

export async function carregarCursos() {
    cursos = await api.buscarDados(endpoint);
    
    cursosConvertido = cursos.map(curso => {
        return {
            ...curso,
            Comprado: new Date(curso.Comprado).toLocaleDateString('pt-BR')
        };
    });
    return cursosConvertido
};

async function listarCursos() {
    const linhaTabela = document.getElementById('linhas');
    const cursos = await carregarCursos();

    if (!linhaTabela) return;

    linhaTabela.innerHTML = ''; 

    if ($.fn.DataTable.isDataTable('.datatable')) {
    $('.datatable').DataTable().clear().destroy(); 
    }
        cursos.forEach(curso => {
            const tr = document.createElement('tr');
            const thId = document.createElement('th');
            thId.textContent = curso.id;
            thId.setAttribute('scope', 'row');

            const tdNomeCurso = document.createElement('td');
            tdNomeCurso.textContent = curso.Name;

            const tdProfessor = document.createElement('td');
            tdProfessor.textContent = curso.Professor;

            const tdAssunto = document.createElement('td');
            tdAssunto.classList.add('text-center');
            tdAssunto.textContent = curso.Assunto;

            const tdComprado = document.createElement('td');
            tdComprado.classList.add('text-center');    
            tdComprado.textContent = curso.Comprado;

            const tdValor = document.createElement('td');
            tdValor.classList.add('text-center');
            tdValor.textContent = curso.Valor;

            const tdStatus = document.createElement('td');
            tdStatus.classList.add('text-center');
            tdStatus.textContent = curso.Status;

            const tdCertificado = document.createElement('td');
            tdCertificado.classList.add('text-center');
            tdCertificado.textContent = curso.Certificado;

            const tdProgresso = document.createElement('td');
            tdProgresso.classList.add('text-center');
            tdProgresso.textContent = curso.Progresso; 
            
            tr.appendChild(thId);
            tr.appendChild(tdNomeCurso);
            tr.appendChild(tdProfessor);
            tr.appendChild(tdAssunto);
            tr.appendChild(tdComprado);
            tr.appendChild(tdValor);
            tr.appendChild(tdStatus);
            tr.appendChild(tdCertificado);
            tr.appendChild(tdProgresso);
            linhaTabela.appendChild(tr);
    });
    // Dispara DataTable
    document.dispatchEvent(new Event('Renderizado'));
};

export async function cursandoPrincipal(statusFiltro, elementoDestinoId) {
    const elementoDestino = document.getElementById(elementoDestinoId);
    const cursos = await carregarCursos()    
    const cursosFiltrados = cursos.filter(curso => curso.Status === statusFiltro)
                                    .slice(0, 4);
                                    
    if (elementoDestino) {
        elementoDestino.innerHTML = "";

        if (!cursosFiltrados.length === 0) {
            cursosFiltrados.forEach(curso => {
                const divContainer = document.createElement('div');
                divContainer.classList.add('col');

                const divContainerCard = document.createElement('div');
                divContainerCard.classList.add('card', 'shadow-sm');

                const imgCapa = document.createElement('img');
                imgCapa.classList.add('card-img-top');
                imgCapa.src = curso.Capa;
                imgCapa.alt = curso.Name;
                imgCapa.height = 250;
                imgCapa.width = '100%';

                const divCardBody = document.createElement('div');
                divCardBody.classList.add('card-body');
                divCardBody.id = 'principal-assistindo';

                const h5Titulo = document.createElement('h5');
                h5Titulo.classList.add('card-title');
                h5Titulo.textContent = curso.Name;

                const divBadge = document.createElement('div');
                divBadge.classList.add('d-flex', 'justify-content-between', 'align-items-center');

                const spanBadge = document.createElement('span');
                spanBadge.classList.add('badge', 'text-bg-info');
                spanBadge.textContent = curso.Assunto;

                const divProgresso = document.createElement('div');
                divProgresso.classList.add('progress', 'mt-2');
                divProgresso.setAttribute('role', 'progressbar');
                divProgresso.setAttribute('aria-label', 'Progresso Assistindo');
                divProgresso.setAttribute('aria-valuenow', curso.Progresso);
                divProgresso.setAttribute('aria-valuemin', '0');
                divProgresso.setAttribute('aria-valuemax', '100');

                const divBarraProgresso = document.createElement('div');
                divBarraProgresso.classList.add('progress-bar', 'bg-success');
                divBarraProgresso.style.width = `${curso.Progresso * 100}%`;
                divBarraProgresso.textContent = `${parseInt(curso.Progresso * 100)}%`;

                divProgresso.appendChild(divBarraProgresso);
                divCardBody.appendChild(h5Titulo);
                divBadge.appendChild(spanBadge);
                divCardBody.appendChild(divBadge);
                divCardBody.appendChild(divProgresso);
                divContainerCard.appendChild(imgCapa);
                divContainerCard.appendChild(divCardBody);
                divContainer.appendChild(divContainerCard);
                elementoDestino.appendChild(divContainer);
           
        });
        } else {
            const pMensagem = document.createElement('p');
            pMensagem.classList.add('mensagem-curso');
            pMensagem.textContent = 'Não há cursos em andamento no momento.';
            elementoDestino.appendChild(pMensagem);
        }          
    } 
};
listarCursos()