import api from "../js/metodoApi.js";

export class ConfiguracaoViewModel {
    constructor(endpoint = 'configuracoes') {
    this.endpoint = endpoint;
    this.configuracao = [];
  }

    async obterConfiguracoes() {
        let configuracoes = []

        configuracoes = await api.buscarDados(this.endpoint);
            
        this.configuracao = configuracoes.map(configuracao => {
            const data = new Date(configuracao.DataContagem);
            return {
            ...configuracao,
            DataContagem: new Date(data).toISOString().slice(0, 16)
            };
        });
            return this.configuracao        
    };

    
}