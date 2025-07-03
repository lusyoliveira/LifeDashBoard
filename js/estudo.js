import { converteData } from "./metodoData.js";

let cursos = [];
let cursosConvertido = [];

const endpoint = './json/cursos.json';
const linhaTabela = document.getElementById('linhas');

async function buscarCursos() {
    const resposta = await fetch(endpoint);
    cursos = await resposta.json();

    cursosConvertido = cursos.map(curso => {
        return {
            ...curso,
            Comprado: converteData(curso.Comprado)
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
                <td>${curso.Valor}</td>
                <td>${curso.Status}</td>
                <td>${curso.Certificado}</td>
                <td>${curso.Progresso}</td>
            </tr>
        `;
    });

    // Dispara DataTable
    document.dispatchEvent(new Event('Renderizado'));
};

//exibe lista de cursos
document.addEventListener('DOMContentLoaded', () => {
    const isEstudoPage = window.location.pathname.endsWith('estudo.html');
    if (isEstudoPage) {
        buscarCursos();
    }
})