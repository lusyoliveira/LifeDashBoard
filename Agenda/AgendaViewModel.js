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
          new Date(compromisso.Data).toLocaleDateString('pt-BR'),
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
          new Date(compromisso.Data).toLocaleDateString('pt-BR'),
        );
        console.log(agenda);
       
        return agenda
    }

  async salvarAgenda(compromisso) {
    if (compromisso.id) {
      await api.atualizarDados(compromisso, this.endpoint);
    } else {
      compromisso.id = this.gerarID()
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
    return [...this.agenda]
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
    return [...this.agenda]
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