import api from './metodoApi.js'

let cursos = [];
let cursosConvertido = [];

const endpoint = 'cursos';
const linhaTabela = document.getElementById('linhas');

export async function carregarCursos() {
    cursos = await api.buscarDados(endpoint);
    
    cursosConvertido = cursos.map(curso => {
        return {
            ...curso,
            Comprado: new Date(curso.Comprado).toLocaleDateString('pt-BR')
        };
    });
    exibirCursos(cursosConvertido)
};

function exibirCursos(listaCursos) {
    if (!linhaTabela) return;

    linhaTabela.innerHTML = ''; 

    if ($.fn.DataTable.isDataTable('.datatable')) {
    $('.datatable').DataTable().clear().destroy(); 
    }

    listaCursos.forEach(curso => {
        linhaTabela.innerHTML += 
        `
            <tr>
                <th scope="row">${curso.Name}</th>
                <td>${curso.Professor}</td>
                <td class="text-center">${curso.Assunto}</td>
                <td class="text-center">${curso.Comprado}</td>
                <td class="text-center">${curso.Valor}</td>
                <td class="text-center">${curso.Status}</td>
                <td class="text-center">${curso.Certificado}</td>
                <td class="text-center">${curso.Progresso}</td>
            </tr>
        `;
    });

    // Dispara DataTable
    document.dispatchEvent(new Event('Renderizado'));
};

export function cursandoPrincipal(statusFiltro, elementoDestinoId) {

    const cursosFiltrado = cursosConvertido.filter(curso => curso.Status === statusFiltro)
                                    .slice(0, 4);

    const elementoDestino = document.getElementById(elementoDestinoId);
    if (elementoDestino) {
        elementoDestino.innerHTML = "";

        if (!cursosFiltrado.length == 0) {
            cursosFiltrado.forEach(curso => {
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
            elementoDestino.innerHTML += 
            `
               <p class="mensagem-curso">Não há cursos em andamento no momento.</p>             
            `
        }          
    } 
};

carregarCursos()