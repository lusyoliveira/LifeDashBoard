export default class Configuracao {
    ID
    AtivaMAL = false
    AtivaOutlook = false
    ChaveOutlook
    AtivaGoogle = false
    ChaveGoogle
    AtivaClima = false
    Cidade
    Latitude = o
    Longitude = 0
    AtualizaClima = 10800
    DataContagem
    DescricaoContagem

    constructor(id, ativMAL, ativaOutlook, chaveOutlook, ativaGoogle, chaveGoogle, ativaClima, cidade, latitude, longitude, dataContagem, descricaoContagem) {
        this.Id = id
        this.AtivaMAL = ativMAL
        this.AtivaOutlook = ativaOutlook
        this.chaveOutlook = chaveOutlook
        this.AtivaGoogle = ativaGoogle
        this.chaveGoogle = chaveGoogle
        this.AtivaClima = ativaClima
        this.Cidade = cidade
        this.Latitude = latitude
        this.Longitude = longitude
        this.DataContagem = dataContagem
        this.DescricaoContagem = descricaoContagem
    }
}