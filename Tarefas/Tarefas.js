export default class Tarefas {
    Id
    Tarefa
    Adicionado
    Feito = false

    constructor(id,tarefa, adicionado){
        this.Id = id
        this.Tarefa = tarefa
        this.Adicionado = adicionado
    }
}