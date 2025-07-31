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
    const cursos = await carregarCursos().filter(curso => curso.Status === statusFiltro)
                                    .slice(0, 4);
                                    
    if (elementoDestino) {
        elementoDestino.innerHTML = "";

        if (!cursos.length === 0) {
            cursos.forEach(curso => {
            elementoDestino.innerHTML += 
            `
            <div class="card shadow-sm"> 
                <svg aria-label="Placeholder: Thumbnail" class="bd-placeholder-img card-img-top" height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c"></rect>
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                </svg>
                <div class="card-body" id="principal-assistindo">
                    <h5 class="card-title">${curso.Name}</h5>
                    <div class="d-flex justify-content-between align-items-center"> 
                        <span class="badge text-bg-info">${curso.Assunto}</span>
                    </div>
                    <div class="progress mt-2" role="progressbar" aria-label="Progresso Assistindo" aria-valuenow="${curso.Progresso*100}" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar bg-success" style="width: ${curso.Progresso*100}%">${curso.Progresso*100}%</div>
                    </div>
                </div>
            </div>                
            `;
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