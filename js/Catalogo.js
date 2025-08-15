export class Catalogo {
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
    Progresso= 0
    Dias= 0

    constructor(titulo) {
        this.Titulo = titulo
        this.Capa = capa
        this.Tipo
        this.Status
        this.Onde
        this.Inicio
        this.Fim
        this.Episodios
        this.Assistidos
        this.Temporadas
        this.Adicao
    }

    async obterCatalogo() {
        let catalogo = [];
        let catalogoConvertido = [];
        
        catalogo = await api.buscarDados(endpoint);
    
        catalogoConvertido = catalogo.map(titulo => {
            return {
                ...titulo,
                Inicio: new Date(titulo.Inicio).toLocaleDateString('pt-BR'),
                Fim: new Date(titulo.Fim).toLocaleDateString('pt-BR'),
                Adicao: new Date(titulo.Adicao).toLocaleDateString('pt-BR')
            };
        });
        return catalogoConvertido;
    }

}