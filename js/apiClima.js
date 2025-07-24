import { carregarConfiguracores } from "./configuracoes.js";

const configuracoesClima = await carregarConfiguracores();
const urlBaseClima = 'https://api.open-meteo.com/v1/forecast';
const urlBaseCidade = 'https://geocoding-api.open-meteo.com/v1/search'

const parametroClima = {
	"latitude": configuracoesClima.Latitude, //-21.7642,
	"longitude": configuracoesClima.Longitude, //-43.3503,
	"current": "temperature_2m",
    "forecast_days": 1
};

const parametroCidade = {
    "name": configuracoesClima.Cidade,
    "count": 1,
    "language": "pt",
    "format": "json",
    "countryCode": "BR"
}

const queryClima = new URLSearchParams(parametroClima).toString();
const urlClima = `${urlBaseClima}?${queryClima}`;

const queryCidade = new URLSearchParams(parametroClima).toString();
const urlCidade = `${urlBaseCidade}?${queryCidade}`;

const apiClima = {
    async obterClima() {
        try {
            const response = await fetch(urlClima)
            return await response.json()
        } catch {
            alert('Erro ao buscar clima na API!')
            throw error
        }
    },
    async obterCidade() {
        try {
            const response = await fetch(urlCidade)
            return await response.json()
        } catch {
            alert('Erro ao buscar cidade na API!')
            throw error
        }
    }
};

//node js\apiClima.js
async function exibirClima() {
   const clima = await apiClima.obterClima();
    //console.log(clima);
    const temperatura = clima.current.temperature_2m;  
};
exibirClima()