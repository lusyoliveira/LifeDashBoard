export default class Tarefas {
    id
    Tarefa
    Adicionado
    Feito = true

    constructor(id,tarefa, adicionado){
        this.Tarefa = tarefa
        this.Adicionado = adicionado
    }
}