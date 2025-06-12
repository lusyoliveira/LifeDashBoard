const mensagemTarefa = document.querySelector(".mensagem-tarefa");

export  function verificaLista(listaTarefa) {
    const itemTarefa = listaTarefa.querySelectorAll('label');
    if (itemTarefa.length === 0) {
        mensagemTarefa.style.display = 'block';
    } else {
        mensagemTarefa.style.display = 'none';
    }
}