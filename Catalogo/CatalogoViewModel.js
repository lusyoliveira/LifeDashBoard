import api from "../js/metodoApi.js";
//import Titulo from "../models/Titulo.js";

export class ViewModel {
  constructor(endpoint = "curso") {
    this.endpoint = endpoint;
    this.titulos = [];
  }

  async carregarCatalogo() {
    let catalogo = [];

    catalogo = await api.buscarDados(this.endpoint);
    this.titulos = catalogo.map((titulo) => {
      return {
        ...titulo,
        Inicio: new Date(titulo.Inicio).toLocaleDateString("pt-BR"),
        Fim: new Date(titulo.Fim).toLocaleDateString("pt-BR"),
        Adicao: new Date(titulo.Adicao).toLocaleDateString("pt-BR"),
      };
    });
    return this.titulos;
  }

  async salvarTitulo(titulo) {
    if (titulo.id) {
      await api.atualizarDados(titulo, this.endpoint);
    } else {
      await api.salvarDados(titulo, this.endpoint);
    }
    return this.carregarCatalogo();
  }

  async excluirTitulo(id) {
    await api.excluirDados(id, this.endpoint);
    return this.carregarCatalogo();
  }

  gerarID() {
    if (this.titulos.length === 0) return 1;
    const maior = Math.max(...this.titulos.map((t) => t.id || 0));
    return maior + 1;
  }

  filtrarPorStatus(status) {
    return this.titulos.filter((t) => t.Status === status);
  }

  filtrarPorTipo(tipo) {
    return this.titulos.filter((t) => t.Tipo === tipo);
  }

  topPorScore(tipo, qtd = 4) {
    return [...this.titulos]
      .filter((t) => t.Tipo === tipo)
      .sort((a, b) => b.Score - a.Score)
      .slice(0, qtd);
  }

  topGeral(qtd = 4) {
    return [...this.titulos].sort((a, b) => b.Score - a.Score).slice(0, qtd);
  }

  recentesPorStatus(status, qtd = 4) {
    return this.titulos
      .filter((t) => t.Status === status)
      .sort((a, b) => {
        const dataA = new Date(a.Adicao.split("/").reverse().join("/"));
        const dataB = new Date(b.Adicao.split("/").reverse().join("/"));
        return dataB - dataA;
      })
      .slice(0, qtd);
  }
  recentes(qtd = 3) {
    return [...this.titulos]
      .sort((a, b) => {
        const dataA = new Date(a.Adicao.split("/").reverse().join("/"));
        const dataB = new Date(b.Adicao.split("/").reverse().join("/"));
        return dataB - dataA;
      })
      .slice(0, qtd);
  }

  estatisticasPorTipo(tipo) {
    const lista = this.filtrarPorTipo(tipo);

    return {
      total: lista.length,
      dias: lista.reduce((acc, t) => acc + (t.Dias || 0), 0),
      totalEpisodios: lista.reduce((acc, t) => acc + (t.Episodios || 0), 0),
      reassistidos: lista.reduce((acc, t) => acc + (t.Reassistindo || 0), 0),
      assistindo: lista.filter((t) => t.Status === "Assistindo").length,
      completado: lista.filter((t) => t.Status === "Completado").length,
      dropped: lista.filter((t) => t.Status === "Dropped").length,
      planejado: lista.filter((t) => t.Status === "Planejado").length,
      emEspera: lista.filter((t) => t.Status === "Em-Espera").length,
      mediaPontuacao: lista.length
        ? (
            lista.reduce((acc, t) => acc + (t.Score || 0), 0) / lista.length
          ).toFixed(1)
        : 0,
    };
  }

  resumoGeral() {
    return {
      Total: this.titulos.length,
      totalDias: this.titulos.reduce((acc, t) => acc + (t.Dias || 0), 0),
      totalEpisodios: this.titulos.reduce(
        (acc, t) => acc + (t.Episodios || 0),
        0
      ),
      totalAssistidos: this.titulos.reduce(
        (acc, t) => acc + (t.Assistidos || 0),
        0
      ),
      reassistidos: this.titulos.reduce(
        (acc, t) => acc + (t.Reassistindo || 0),
        0
      ),
      assistindo: this.titulos.filter((t) => t.Status === "Assistindo").length,
      completado: this.titulos.filter((t) => t.Status === "Completado").length,
      dropped: this.titulos.filter((t) => t.Status === "Dropped").length,
      planejado: this.titulos.filter((t) => t.Status === "Planejado").length,
      emEspera: this.titulos.filter((t) => t.Status === "Em-Espera").length,
      serie: this.titulos.filter((t) => t.Tipo === "Serie").length,
      filme: this.titulos.filter((t) => t.Tipo === "Filme").length,
      show: this.titulos.filter((t) => t.Tipo === "Show").length,
      desenho: this.titulos.filter((t) => t.Tipo === "Desenho").length,
      documentario: this.titulos.filter((t) => t.Tipo === "Documentário")
        .length,
      reality: this.titulos.filter((t) => t.Tipo === "Reality").length,
      mediaPontuacao: this.titulos.length
        ? (
            this.titulos.reduce((acc, t) => acc + (t.Score || 0), 0) /
            this.titulos.length
          ).toFixed(1)
        : 0,
    };
  }

  dadosGraficoTipo() {
    const tipos = [
      "Serie",
      "Filme",
      "Documentário",
      "Reality",
      "Desenho",
      "Show",
    ];
    const valores = tipos.map((tipo) => this.filtrarPorTipo(tipo).length);
    return { labels: tipos, data: valores };
  }

  dadosGraficoStatus() {
    const status = [
      "Assistindo",
      "Reassistindo",
      "Completado",
      "Dropped",
      "Planejado",
      "Em-Espera",
    ];
    const valores = status.map((s) => this.filtrarPorStatus(s).length);
    return { labels: status, data: valores };
  }

  dadosGraficoPlataforma() {
    const plataformas = [
      "Netflix",
      "Amazom Prime",
      "Crunchroll",
      "YouTube",
      "MAX",
      "Download",
      "TV",
    ];
    const valores = plataformas.map(
      (p) => this.titulos.filter((t) => t.Onde === p).length
    );
    return { labels: plataformas, data: valores };
  }
}
