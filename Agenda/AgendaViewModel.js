import api from "../js/metodoApi.js";
//import Agenda from "../Agenda.js";

export class AgendaViewModel {
  constructor(endpoint = "agenda") {
    this.endpoint = endpoint;
    this.compromissos = [];
  }

  async obterAgenda() {
    let agenda = [];

    agenda = await api.buscarDados(this.endpoint);
    this.compromissos = agenda.map(compromisso => {
        const data = new Date(compromisso.Data);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return {
        ...compromisso,
        Data: `${dia}/${mes}/${ano}`
        };
    })
    return this.compromissos;
  }

  async salvarAgenda(compromisso) {
    if (compromisso.id) {
      await api.atualizarDados(compromisso, this.endpoint);
    } else {
      await api.salvarDados(compromisso, this.endpoint);
    }
    return this.obterAgenda();
  }

  async excluirAgenda(id) {
    await api.excluirDados(id, this.endpoint);
    return this.obterAgenda();
  }

  gerarID() {
    if (this.agenda.length === 0) return 1;
    const maior = Math.max(...this.agenda.map((t) => t.id || 0));
    return maior + 1;
  }

  filtrarAgenda (){
    return [...this.compromissos]
              .filter(compromisso => {
                const [diaComp, mesComp, anoComp] = compromisso.Data.split('/');
                return (
                    parseInt(diaComp) === i &&
                    parseInt(mesComp) === mes + 1 &&
                    parseInt(anoComp) === ano
                );
            });    
  } 

  filtrarProximosCompromissos(qtd = 13) {
    return [...this.compromissos]
            .filter(compromisso => {
                const [dia, mes, ano] = compromisso.Data.split('/');
                const dataCompromisso = new Date(`${ano}-${mes}-${dia}T00:00:00`);
                return dataCompromisso > new Date(); 
            })
            .sort((a, b) => {
                const [diaA, mesA, anoA] = a.Data.split('/');
                const [diaB, mesB, anoB] = b.Data.split('/');
                const dataA = new Date(`${anoA}-${mesA}-${diaA}T00:00:00`);
                const dataB = new Date(`${anoB}-${mesB}-${diaB}T00:00:00`);
                return dataA - dataB; // crescente
            })
            .slice(0, qtd);
  }
}