const urlBase = 'https://api.open-meteo.com/v1/forecast';

const params = {
	"latitude": -21.7642,
	"longitude": -43.3503,
	"current": "temperature_2m",
    "forecast_days": 1
};

const queryString = new URLSearchParams(params).toString();
const url = `${baseUrl}?${queryString}`;

const apiClima = {
    async obterClima() {
        try {
            const response = await fetch(url)
            return await response.json()
        } catch {
            alert('Erro ao buscar clima na API!')
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