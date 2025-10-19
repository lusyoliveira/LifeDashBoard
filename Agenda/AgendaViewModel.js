import api from "../js/metodoApi.js";
import Agenda from "../Agenda/Agenda.js";

export class AgendaViewModel {
  constructor(endpoint = "agenda") {
    this.endpoint = endpoint;
    this.agenda = [];
  }

  async obterAgenda() {
    const agendaData = await api.buscarDados(this.endpoint);

    this.agenda = agendaData.map((compromisso) => {
        const compromissos = new Agenda(
          compromisso.id,
          compromisso.Titulo,
          compromisso.Status,
          compromisso.Categoria,
          compromisso.Tipo,
          compromisso.Data,
        );       
        return compromissos;
    })     
    return this.agenda;
  }

    async obterAgendaPorID(agendaID) {
       const compromisso = await api.buscarDadosPorId(agendaID,this.endpoint);
      if (!compromisso) return null;

      const agenda = new Agenda(
          compromisso.id,
          compromisso.Titulo,
          compromisso.Status,
          compromisso.Categoria,
          compromisso.Tipo,
          compromisso.Data,
        );
        console.log(agenda);
       
        return agenda
    }

  async salvarAgenda(compromisso) {
    const payload = {
      ...compromisso
    };

    if (compromisso.id) {
      await api.atualizarDados(payload, this.endpoint);
    } else {
      payload.id = this.gerarID()
      await api.salvarDados(payload, this.endpoint);
    }
    return this.obterAgenda();
  }

  async excluirAgenda(id) {
    await api.excluirDados(id, this.endpoint);
    return this.obterAgenda();
  }

  gerarID() {
    if (this.agenda.length === 0) return "1";
    const maior = Math.max(...this.agenda.map((t) => Number(t.id) || 0));
    return String(maior + 1);
  }

  filtrarAgenda (){
    return [...this.agenda]
              .filter(compromisso => {
              const dataCompromisso = new Date(compromisso.Data);
              return dataCompromisso > new Date(); 
            })   
  } 

  filtrarProximosCompromissos(qtd = 13) {
    return [...this.agenda]
      .filter(compromisso => {
        const dataCompromisso = new Date(compromisso.Data);
        return dataCompromisso > new Date(); 
      })
      .sort((a, b) => new Date(a.Data) - new Date(b.Data))
      .slice(0, qtd);
  }
}