export default class Estudo {
    id
    Caoa
    Escola
    Aulas
    Assistido
    Horas
    Curso
    Instrutor
    Area
    DataCompra
    Valor
    Status
    Certificado

    constructor(id, capa, escola,aulas, assistido, horas,curso,instrutor,area,dataCompra,valor,status, certificado = false){
        this.id = id
        this.Capa = capa
        this.Escola = escola
        this.Aulas = aulas
        this.Assistido = assistido
        this.Horas = horas
        this.Curso = curso
        this.Instrutor = instrutor
        this.Area = area
        this.DataCompra = dataCompra
        this.Valor = valor
        this.Status = status
        this.Certificado = certificado
    }

    get Progresso () {
        if (!this.Assistido || !this.Aulas || isNaN(this.Assistido) || isNaN(this.Aulas)) {
            return 0;
        }
            return (this.Assistido / this.Aulas) * 100; 
    }
}