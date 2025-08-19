import api from "../js/metodoApi.js";
//import Transacao from "../Transacao.js";

export class FinanceiroViewModel {
    constructor(endpoint = "transacoes") {
        this.endpoint = endpoint;
        this.transacoes = [];
    }

    async obterTransacoes() {
    let financeiro = [];

    financeiro = await api.buscarDados(this.endpoint);
    this.transacoes = financeiro.map(transacao => {
        const data = new Date(transacao.Data);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return {
        ...transacao,
        Data: `${dia}/${mes}/${ano}`
        };
    })
    return this.transacoes;
  }
}