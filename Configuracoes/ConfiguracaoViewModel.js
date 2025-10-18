import api from "../js/metodoApi.js";
import Configuracao from "../Configuracoes/Configuracao.js";

export class ConfiguracaoViewModel {
    constructor(endpoint = 'configuracoes') {
    this.endpoint = endpoint;
    this.configuracao = [];
  }

    async obterConfiguracoes() {
       const configuracaoData = await api.buscarDados(this.endpoint);
            
        this.configuracao = configuracaoData.map((configuracoes) => {
            const configuracao = new Configuracao(
                configuracoes.id,
                configuracoes.AtivaMAL,
                configuracoes.AtivaOutlook,
                configuracoes.ChaveOutlook,
                configuracoes.AtivaGoogle,
                configuracoes.ChaveGoogle,
                configuracoes.Cidade,
                configuracoes.Latitude,
                configuracoes.Longitude,
                configuracoes.AtivaClima,
                configuracoes.AtualizaClima,
                new Date(configuracoes.DataContagem).toISOString().slice(0, 16),
                configuracoes.DescricaoContagem
            );
            console.log(configuracao);
            
            return configuracao;
        });
            return this.configuracao        
    };

    async salvarConfiguracao(configuracao) {
        if (configuracao.id) {
            await api.atualizarDados(configuracao, this.endpoint);
        } else {
            await api.salvarDados(configuracao, this.endpoint);
        }
        return this.obterConfiguracoes();
    }
}