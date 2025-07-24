import api from './metodoApi.js'

let configuracoes = [];
let configuracoesConvertido = [];

const endpoint = 'configuracoes';
const linhaTabela = document.getElementById('linhas');

export async function carregarConfiguracores() {
    configuracoes = await api.buscarDados(endpoint);
        
    configuracoesConvertido = configuracoes.map(configuracao => {
        const data = new Date(configuracao.DataContagem);
        return {
        ...configuracao,
        DataContagem: new Date(data).toISOString().slice(0, 16)
        //"yyyy-MM-ddThh:mm"
        };
    });
     return configuracoesConvertido   
};

async function exibeConfiguracoes() {
    const config = await carregarConfiguracores()    

    if (config.length > 0) {
        configuracaoContagem(config[0]);
        configuracaoMAL(config[0]);
        configuracaoGoogle(config[0]);
        configuracaoOutlook(config[0]);
        configuracaoClima(config[0]);
    } 
};

function configuracaoContagem(configuracoes) {
    const elementoDestino = document.getElementById('linha-contagem');

     if (elementoDestino) {
        elementoDestino.innerHTML = "";
        elementoDestino.innerHTML += 
        `
            <div class="col">
                <label for="data-contagem" class="form-label">Data:</label>
                <input type="datetime-local" class="form-control" id="data-contagem" placeholder="Informe a data" aria-label="Informe a data" value="${configuracoes.DataContagem}">
            </div>
            <div class="col">
                <label for="descricao-contagem" class="form-label">Descrição:</label>
                <input type="text" class="form-control" id="descricao-contagem" placeholder="Informe a descrição" aria-label="Informe a descrição" value="${configuracoes.DescricaoContagem}">
            </div>
        `;
    }        
};

function configuracaoMAL(configuracoes) {
    const elementoDestino = document.getElementById('linha-mal');

    if (elementoDestino) {
        const divMAL = document.createElement('div');
        divMAL.classList.add('form-control')

        const tituloMAL = document.createElement('h4')
        tituloMAL.classList.add('pb-2')
        tituloMAL.textContent = 'MyAnimeList'

        const divSwitch = document.createElement('div');
        divSwitch.classList.add('form-check', 'form-switch')

        const labelSwitch = document.createElement('label');
        labelSwitch.classList.add('form-label')
        labelSwitch.setAttribute('for','habilitar-mal')
        labelSwitch.textContent = 'Habilita MyAnimeList'

        const inputSwitch = document.createElement('input');
        inputSwitch.classList.add('form-check-input')
        inputSwitch.setAttribute('type', 'checkbox')
        inputSwitch.setAttribute('role', 'switch')
        inputSwitch.setAttribute('id', 'habilitar-mal')
        inputSwitch.onclick = () => {
            if (configuracoes.AtivaMAL) {                
                inputSwitch.setAttribute('checked')
            } else {                
                inputSwitch.removeAttribute('checked')
            }
        }
        
        const divCredencial = document.createElement('div');
        divCredencial.classList.add('form-text')

        const labelCredencial = document.createElement('label');
        labelCredencial.classList.add('form-label')
        labelCredencial.setAttribute('for','credencial-mal')
        labelCredencial.textContent = 'Informe as credenciais:'

        const inputCredencial = document.createElement('input');
        inputCredencial.classList.add('form-control')
        inputCredencial.setAttribute('type', 'text')
        inputCredencial.setAttribute('placeholder', 'Informe o client-ID')
        inputCredencial.setAttribute('aria-label', 'Informe o client-ID')
        inputCredencial.setAttribute('id', 'credencial-mal')

        divSwitch.appendChild(labelSwitch)
        divSwitch.appendChild(inputSwitch)
        divCredencial.appendChild(labelCredencial)
        divCredencial.appendChild(inputCredencial)
        divMAL.appendChild(tituloMAL)
        divMAL.appendChild(divSwitch)
        divMAL.appendChild(divCredencial)
        elementoDestino.appendChild(divMAL)
    }
};
function configuracaoGoogle(configuracoes) {
    const elementoDestino = document.getElementById('linha-google');

    if (elementoDestino) {
        const divGoogle = document.createElement('div');
        divGoogle.classList.add('form-control')

        const tituloGoogle = document.createElement('h4')
        tituloGoogle.classList.add('pb-2')
        tituloGoogle.textContent = 'Google Agenda'

        const divSwitch = document.createElement('div');
        divSwitch.classList.add('form-check', 'form-switch')

        const labelSwitch = document.createElement('label');
        labelSwitch.classList.add('form-label')
        labelSwitch.setAttribute('for','habilitar-google')
        labelSwitch.textContent = 'Habilita Google'

        const inputSwitch = document.createElement('input');
        inputSwitch.classList.add('form-check-input')
        inputSwitch.setAttribute('type', 'checkbox')
        inputSwitch.setAttribute('role', 'switch')
        inputSwitch.setAttribute('id', 'habilitar-google')
        inputSwitch.onclick = () => {
            if (configuracoes.AtivaGoogle) {                
                inputSwitch.setAttribute('checked')
            } else {                
                inputSwitch.removeAttribute('checked')
            }
        }
        
        const divCredencial = document.createElement('div');
        divCredencial.classList.add('form-text')

        const labelCredencial = document.createElement('label');
        labelCredencial.classList.add('form-label')
        labelCredencial.setAttribute('for','credencial-google')
        labelCredencial.textContent = 'Informe as credenciais:'

        const inputCredencial = document.createElement('input');
        inputCredencial.classList.add('form-control')
        inputCredencial.setAttribute('type', 'text')
        inputCredencial.setAttribute('placeholder', 'Informe o client-ID')
        inputCredencial.setAttribute('aria-label', 'Informe o client-ID')
        inputCredencial.setAttribute('id', 'credencial-google')

        divSwitch.appendChild(labelSwitch)
        divSwitch.appendChild(inputSwitch)
        divCredencial.appendChild(labelCredencial)
        divCredencial.appendChild(inputCredencial)
        divGoogle.appendChild(tituloGoogle)
        divGoogle.appendChild(divSwitch)
        divGoogle.appendChild(divCredencial)
        elementoDestino.appendChild(divGoogle)
    }
};

function configuracaoOutlook(configuracoes) {
    const elementoDestino = document.getElementById('linha-outlook');

    if (elementoDestino) {
        const divOutlook = document.createElement('div');
        divOutlook.classList.add('form-control')

        const titulOutlook = document.createElement('h4')
        titulOutlook.classList.add('pb-2')
        titulOutlook.textContent = 'Outlook'

        const divSwitch = document.createElement('div');
        divSwitch.classList.add('form-check', 'form-switch')

        const labelSwitch = document.createElement('label');
        labelSwitch.classList.add('form-label')
        labelSwitch.setAttribute('for','habilitar-outlook')
        labelSwitch.textContent = 'Habilita Outlook'

        const inputSwitch = document.createElement('input');
        inputSwitch.classList.add('form-check-input')
        inputSwitch.setAttribute('type', 'checkbox')
        inputSwitch.setAttribute('role', 'switch')
        inputSwitch.setAttribute('id', 'habilitar-outlook')
        inputSwitch.onclick = () => {
            if (configuracoes.AtivaOutlook) {                
                inputSwitch.setAttribute('checked')
            } else {                
                inputSwitch.removeAttribute('checked')
            }
        }
        
        const divCredencial = document.createElement('div');
        divCredencial.classList.add('form-text')

        const labelCredencial = document.createElement('label');
        labelCredencial.classList.add('form-label')
        labelCredencial.setAttribute('for','credencial-outlook')
        labelCredencial.textContent = 'Informe as credenciais:'

        const inputCredencial = document.createElement('input');
        inputCredencial.classList.add('form-control')
        inputCredencial.setAttribute('type', 'text')
        inputCredencial.setAttribute('placeholder', 'Informe o client-ID')
        inputCredencial.setAttribute('aria-label', 'Informe o client-ID')
        inputCredencial.setAttribute('id', 'credencial-outlook')

        divSwitch.appendChild(labelSwitch)
        divSwitch.appendChild(inputSwitch)
        divCredencial.appendChild(labelCredencial)
        divCredencial.appendChild(inputCredencial)
        divOutlook.appendChild(titulOutlook)
        divOutlook.appendChild(divSwitch)
        divOutlook.appendChild(divCredencial)
        elementoDestino.appendChild(divOutlook)
    }
};

function configuracaoClima(configuracoes) {
    const elementoDestino = document.getElementById('linha-clima');

    if (elementoDestino) {
        const divClima = document.createElement('div');
        divClima.classList.add('form-control')

        const titulClima = document.createElement('h4')
        titulClima.classList.add('pb-2')
        titulClima.textContent = 'Clima'

        const divSwitch = document.createElement('div');
        divSwitch.classList.add('form-check', 'form-switch')

        const labelSwitch = document.createElement('label');
        labelSwitch.classList.add('form-label')
        labelSwitch.setAttribute('for','habilitar-clima')
        labelSwitch.textContent = 'Habilita Clima'

        const inputSwitch = document.createElement('input');
        inputSwitch.classList.add('form-check-input')
        inputSwitch.setAttribute('type', 'checkbox')
        inputSwitch.setAttribute('role', 'switch')
        inputSwitch.setAttribute('id', 'habilitar-clima')
        inputSwitch.onclick = () => {
            if (configuracoes.AtivaClima) {                
                inputSwitch.setAttribute('checked')
            } else {                
                inputSwitch.removeAttribute('checked')
            }
        }
        
        const divCidade = document.createElement('div');
        divCidade.classList.add('col')

        const labelCidade = document.createElement('label');
        labelCidade.classList.add('form-label')
        labelCidade.setAttribute('for','cidade')
        labelCidade.textContent = 'Cidade'

        const inputCidade = document.createElement('input');
        inputCidade.classList.add('form-control')
        inputCidade.setAttribute('type', 'text')
        inputCidade.setAttribute('placeholder', 'Informe a cidade')
        inputCidade.setAttribute('aria-label', 'Informe a cidade')
        inputCidade.setAttribute('id', 'cidade')
        inputCidade.value = configuracoes.Cidade

        const btnBuscar = document.createElement('button')
        btnBuscar.classList.add('btn', 'btn-primary')
        btnBuscar.setAttribute('type','submit')
        btnBuscar.setAttribute('id','btn-buscar-cidade')
        btnBuscar.setAttribute('title','Buscar Cidade')
        btnBuscar.textContent = 'Buscar'

        const divLocalizacao = document.createElement('div');
        divLocalizacao.classList.add('form-text')

        const labelLatitude = document.createElement('label');
        labelLatitude.classList.add('form-label')
        labelLatitude.setAttribute('for','latitude')
        labelLatitude.textContent = 'Latitude'

        const inputLatitude = document.createElement('input');
        inputLatitude.classList.add('form-control')
        inputLatitude.setAttribute('type', 'text')
        inputLatitude.setAttribute('placeholder', 'Informe a latitude')
        inputLatitude.setAttribute('aria-label', 'Informe a latitude')
        inputLatitude.setAttribute('id', 'latitude')
        inputLatitude.value = configuracoes.Latitude

        const labelLongitude = document.createElement('label');
        labelLongitude.classList.add('form-label')
        labelLongitude.setAttribute('for','longitude')
        labelLongitude.textContent = 'Longitude'

        const inputLongitude = document.createElement('input');
        inputLongitude.classList.add('form-control')
        inputLongitude.setAttribute('type', 'text')
        inputLongitude.setAttribute('placeholder', 'Informe a longitude')
        inputLongitude.setAttribute('aria-label', 'Informe a longitude')
        inputLongitude.setAttribute('id', 'longitude')
        inputLongitude.value = configuracoes.Longitude

        divLocalizacao.appendChild(labelLatitude)
        divLocalizacao.appendChild(inputLatitude)
        divLocalizacao.appendChild(labelLongitude)
        divLocalizacao.appendChild(inputLongitude)
        divSwitch.appendChild(labelSwitch)
        divSwitch.appendChild(inputSwitch)
        divCidade.appendChild(labelCidade)
        divCidade.appendChild(inputCidade)
        divCidade.appendChild(btnBuscar)
        divClima.appendChild(titulClima)
        divClima.appendChild(divSwitch)
        divClima.appendChild(divCidade)
        divClima.appendChild(divLocalizacao)
        elementoDestino.appendChild(divClima)
    }
};
// const config = await carregarConfiguracores()
exibeConfiguracoes()