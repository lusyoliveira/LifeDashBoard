import { adicionarTarefa } from "./adicionarTarefa.js";

const botaoTarefa = document.getElementById('adiciona-tarefa');
const listaTarefa = document.getElementById('lista-tarefa');

botaoTarefa.addEventListener("click", (evento) => { 
    evento.preventDefault();
    const tarefa = adicionarTarefa();

    listaTarefa.appendChild(tarefa);
    //verifica lista
})

