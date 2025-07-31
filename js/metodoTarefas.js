import { converteDataUTC } from "./metodoData.js";
import api from './metodoApi.js'

const inputIdTarefa = document.getElementById('id-tarefa');
const inputTarefa = document.getElementById('tarefa');
const botaoTarefa = document.getElementById('adiciona-tarefa');
const liTarefa = document.getElementById('lista-tarefa');
const imagemBotao  = botaoTarefa.querySelector('i');
const listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

let contador = 0;
let tarefas = [];
let tarefasConvertida = [];

const endpoint = 'tarefas';

export async function carregarTarefas() {
    tarefas = await api.buscarDados(endpoint);
       tarefasConvertida = tarefas.map(tarefa => {
        const data = new Date(tarefa.Adicionado);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return {
        ...tarefa,
        Adicionado: `${dia}/${mes}/${ano}`
        };
    });
    return tarefasConvertida
};

//Adiciona tarefa
botaoTarefa.addEventListener("click", (evento) => { 
    evento.preventDefault();          
    salvarTarefa(evento);
    // const tarefa = {
    //     descricao: inputTarefa.value,
    //     data: criarData()
    // }
    // listaTarefas.push(tarefa)
    // const criaElementoTarefa = adicionarTarefa(tarefa);
    // liTarefa.appendChild(criaElementoTarefa)
    // atualizarTarefa()
    // inputTarefa.value = '';
    // verificaLista(liTarefa);
});

// function atualizarTarefa() {
//     localStorage.setItem('tarefas', JSON.stringify(listaTarefas))
// };

// export function adicionarTarefa(tarefa) {
//     if (tarefa.value === '') {
//         alert('É necessário inserir uma tarefa!');
//         return
//     }
//    //Constroi lista de tarefas
//     const labelTarefa = document.createElement('label');
//     labelTarefa.classList.add('list-group-item', 'd-flex', 'gap-3', 'text-start');
//     const checkTarefa = document.createElement('input');
//     checkTarefa.classList.add('form-check-input', 'flex-shrink-0');
//     checkTarefa.type = 'checkbox';
//     checkTarefa.id = 'checkbox-tarefa-' + contador++;
//     checkTarefa.value = '';
//     checkTarefa.style = 'font-size: 1.375em';
//     const spanTarefa = document.createElement('span');
//     spanTarefa.classList.add('pt-1', 'form-checked-content');
//     const strongTarefa = document.createElement('strong');
//     strongTarefa.innerText = tarefa.descricao;

//      //Estiliza nome do item
//     checkTarefa.addEventListener('click', function() {
//         if (checkTarefa.checked) {
//             strongTarefa.style.textDecoration = "line-through";
//         } else {
//             strongTarefa.style.textDecoration = "none";
//         }
//     })

//     const btnEditar = document.createElement('button')
//     btnEditar.classList.add('btn')
//     btnEditar.setAttribute('type', 'button')
//     btnEditar.setAttribute('id', 'botao-editar')
//     btnEditar.setAttribute('title', 'Editar Tarefa')
//     // btnEditar.onclick = () => function() {
//     //   inputTarefa.value = strongTarefa.textContent
//     // }

//     const iconeEditar = document.createElement('i')
//     iconeEditar.classList.add('bi', 'bi-pencil-fill')
//     iconeEditar.setAttribute ('id', 'editar-tarefa')
    
//     const smallTarefa = document.createElement('small');
//     smallTarefa.classList.add('d-block', 'text-body-secondary');
//     smallTarefa.innerText = tarefa.data;

//     btnEditar.appendChild(iconeEditar);
//     labelTarefa.appendChild(checkTarefa);
//     labelTarefa.appendChild(spanTarefa);
//     labelTarefa.appendChild(btnEditar);
//     spanTarefa.appendChild(strongTarefa);    
//     spanTarefa.appendChild(smallTarefa);
    
//     return labelTarefa
// };

// export  function verificaLista(listaTarefa) {
//     const itemTarefa = listaTarefa.querySelectorAll('label');
//     if (itemTarefa.length === 0) {
//         mensagemTarefa.style.display = 'block';
//     } else {
//         mensagemTarefa.style.display = 'none';
//     }
// };

// listaTarefas.forEach(tarefa => {
//     const criaElementoTarefa = adicionarTarefa(tarefa);
//     liTarefa.appendChild(criaElementoTarefa)
//     verificaLista(liTarefa);
// });

export async function listarTarefas() {
    const tarefas = await carregarTarefas() 

    if (tarefas.length >= 1) {
        tarefas.forEach(tarefa => {
            const labelTarefa = document.createElement('label');
            labelTarefa.classList.add('list-group-item', 'd-flex', 'gap-3', 'text-start');

            const checkTarefa = document.createElement('input');
            checkTarefa.classList.add('form-check-input', 'flex-shrink-0');
            checkTarefa.type = 'checkbox';
            checkTarefa.id = tarefa.id 
            checkTarefa.value = '';
            checkTarefa.style = 'font-size: 1.375em';

            const spanTarefa = document.createElement('span');
            spanTarefa.classList.add('pt-1', 'form-checked-content');
            
            const strongTarefa = document.createElement('strong');
            strongTarefa.innerText = tarefa.tarefa;
    
            //Estiliza nome do item
            checkTarefa.addEventListener('click', function() {
                if (checkTarefa.checked) {
                    strongTarefa.style.textDecoration = "line-through";
                } else {
                    strongTarefa.style.textDecoration = "none";
                }
            })
    
            const btnEditar = document.createElement('button')
            btnEditar.classList.add('btn')
            btnEditar.setAttribute('type', 'button')
            btnEditar.setAttribute('id', 'botao-editar')
            btnEditar.setAttribute('title', 'Editar Tarefa')
            btnEditar.onclick = async ()  => {
                preencherInputTarefa(tarefa.id)
                
                imagemBotao.classList.remove('bi', 'bi-plus-lg');
                imagemBotao.classList.add('bi', 'bi-floppy-fill');
            }
    
            const iconeEditar = document.createElement('i')
            iconeEditar.classList.add('bi', 'bi-pencil-fill')
            iconeEditar.setAttribute ('id', 'editar-tarefa')
            
            const smallTarefa = document.createElement('small');
            smallTarefa.classList.add('d-block', 'text-body-secondary');
            smallTarefa.innerText = `Adicionado em ${tarefa.Adicionado}`;
    
            btnEditar.appendChild(iconeEditar);
            labelTarefa.appendChild(checkTarefa);
            labelTarefa.appendChild(spanTarefa);
            labelTarefa.appendChild(btnEditar);
            spanTarefa.appendChild(strongTarefa);    
            spanTarefa.appendChild(smallTarefa);
            liTarefa.appendChild(labelTarefa);    
        })
    } else {
        const pMensagem = document.createElement('p');
        pMensagem.classList.add('mensagem-tarefa');
        pMensagem.textContent = ' Não há tarefas pendentes.';
        liTarefa.appendChild(pMensagem);
    }
};

async function salvarTarefa(event) {
    event.preventDefault();
    const data = new Date();
    const dataConvertida = converteDataUTC(data.toISOString().slice(0, 16));

    const tarefa = {
        tarefa: inputTarefa.value,
        Adicionado: dataConvertida
    };
    
    if (tarefa.descricao === '') {
        alert('É necessário inserir uma tarefa!');
        return;
    }
    
    try {
        if (tarefa) {
            await api.atualizarDados(tarefa, endpoint);
            imagemBotao.classList.remove('bi', 'bi-floppy-fill');
            imagemBotao.classList.add('bi', 'bi-plus-lg');
        } else {
            await api.salvarDados(tarefa, endpoint);
        }
        listarTarefas()
    } catch (error) {
        alert('Erro ao salvar a tarefa: ' + error.message);
    }
}

async function preencherInputTarefa(tarefaId) {
    const tarefa = await api.buscarDadosPorId(tarefaId, endpoint);

    if (tarefa) {
        inputIdTarefa.value = tarefa.id;
        inputTarefa.value = tarefa.tarefa;
    } else {
        alert('Tarefa não encontrada!');
    }
}


    