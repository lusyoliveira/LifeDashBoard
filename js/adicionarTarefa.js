const adicionaTarefa = document.getElementById('tarefa');
let contador = 0;

export function adicionarTarefa() {
    if (adicionaTarefa.value === "") {
        alert('É necessário inserir uma tarefa!');
        return
    }

    //Constroi lista
    const labelLista = document.createElement('label');
    labelLista.classList.add('list-group-item');
    labelLista.classList.add('d-flex');
    labelLista.classList.add('gap-3');
    const checkTarefa = document.createElement('input');
    checkTarefa.type = 'checkbox';
    checkTarefa.id = 'checkbox-' + contador++;
    const spanLista = document.createElement('span');
    spanLista.classList.add('pt-1');
    spanLista.classList.add('form-checked-content');
    const strongLista = document.createElement('strong');
    strongLista.innerText = adicionaTarefa.value;
}