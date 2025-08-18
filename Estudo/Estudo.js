export default class Estudo {
    id
    Curso
    Instrutor
    Area
    DataCompra
    Valor
    Status
    Certificado = false

    constructor(id, curso, instrutor,area,dataCompra,valor,status){
        this.Curso = curso
        this.Instrutor = instrutor
        this.Area = area
        this.DataCompra = dataCompra
        this.Valor = valor
        this.Status = status
    }
}