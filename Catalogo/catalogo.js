export default class Catalogo {
    Id
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

    constructor(id, Titulo, Capa, Tipo, Status, Onde,Inicio, Fim, Episodios, Assistidos, Temporadas) {
        this.Id = id
        this.Titulo = Titulo
        this.Capa = Capa
        this.Tipo = Tipo
        this.Status = Status
        this.Onde = Onde
        this.Inicio = new Date(Inicio)
        this.Fim = new Date(Fim)
        this.Episodios = Episodios
        this.Assistidos = Assistidos
        this.Temporadas = Temporadas
    }

    get Dias() {
        if (!this.Inicio || !this.Fim || isNaN(this.Inicio) || isNaN(this.Fim)) {
            return 0
        }
        const diffMs = this.Fim - this.Inicio
        return Math.floor(diffMs / (1000 * 60 * 60 * 24))
    }
}