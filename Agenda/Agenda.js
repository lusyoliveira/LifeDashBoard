export default class Agenda {
    Id
    Titulo
    Status
    Categoria
    Tipo
    Data

    constructor (id, titulo,status,categoria,tipo,data) {
        this.Id = id
        this.Titulo = titulo           
        this.Status = status
        this.Categoria = categoria
        this.Tipo = tipo
        this.Data = data
    }
}