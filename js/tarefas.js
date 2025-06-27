import { criarData } from "./criarData.js";

const mensagemTarefa = document.querySelector(".mensagem-tarefa");
const inputTarefa = document.getElementById('tarefa');
let contador = 0;

export function adicionarTarefa() {
    if (inputTarefa.value === "") {
        alert('É necessário inserir uma tarefa!');
        return
    }

    //Constroi lista
    const labelTarefa = document.createElement('label');
    labelTarefa.classList.add('list-group-item', 'd-flex', 'gap-3', 'text-start');
    const checkTarefa = document.createElement('input');
    checkTarefa.classList.add('form-check-input', 'flex-shrink-0');
    checkTarefa.type = 'checkbox';
    checkTarefa.id = 'checkbox-tarefa-' + contador++;
    checkTarefa.value = '';
    checkTarefa.style = 'font-size: 1.375em';
    const spanTarefa = document.createElement('span');
    spanTarefa.classList.add('pt-1', 'form-checked-content');
    const strongTarefa = document.createElement('strong');
    strongTarefa.innerText = inputTarefa.value;

     //Estiliza nome do item
    checkTarefa.addEventListener('click', function() {
        if (checkTarefa.checked) {
            strongTarefa.style.textDecoration = "line-through";
        } else {
            strongTarefa.style.textDecoration = "none";
        }
    })
    //Constroi data
    const dataItem = criarData();   
    
    const smallTarefa = document.createElement('small');
    smallTarefa.classList.add('d-block', 'text-body-secondary');
    smallTarefa.innerText = dataItem;

    labelTarefa.appendChild(checkTarefa);
    labelTarefa.appendChild(spanTarefa);
    spanTarefa.appendChild(strongTarefa);    
    spanTarefa.appendChild(smallTarefa);
    
    return labelTarefa
};

export  function verificaLista(listaTarefa) {
    const itemTarefa = listaTarefa.querySelectorAll('label');
    if (itemTarefa.length === 0) {
        mensagemTarefa.style.display = 'block';
    } else {
        mensagemTarefa.style.display = 'none';
    }
}