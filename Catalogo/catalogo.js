export default class Catalogo {
    id
    Titulo
    Capa
    Tipo
    Status
    Onde
    Inicio
    Fim
    Episodios
    Assistidos
    Temporadas
    Score = 0
    Vezes = 0
    Adicao
    Progresso = 0
    Dias = 0

    constructor(id, Titulo, Capa, Tipo, Status, Onde,Inicio, Fim, Episodios, Assistidos, Temporadas) {
        this.Titulo = Titulo
        this.Capa = Capa
        this.Tipo = Tipo
        this.Status = Status
        this.Onde = Onde
        this.Inicio = Inicio
        this.Fim = Fim
        this.Episodios = Episodios
        this.Assistidos = Assistidos
        this.Temporadas = Temporadas
    }
}