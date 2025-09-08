import api from "../js/metodoApi.js";
import Catalogo from "../Catalogo/catalogo.js";

export class CatalogoViewModel {
  constructor(endpoint = "catalogo") {
    this.endpoint = endpoint;
    this.catalogo = [];
  }

   async obterCatalogo() {
    const catalogoData = await api.buscarDados(this.endpoint);

    this.catalogo = catalogoData.map((titulo) => {
      const titulos = new Catalogo(
        titulo.id,
        titulo.Titulo,
        titulo.Capa,
        titulo.Tipo,
        titulo.Status,
        titulo.Onde,
        titulo.Inicio,
        titulo.Fim,
        titulo.Episodios,
        titulo.Assistidos,
        titulo.Temporadas,
        titulo.Score,
        titulo.Vezes,
        titulo.Adicao
      );

      if (titulos.Inicio) {
        const dataInicio = new Date(titulos.Inicio)
        if (!isNaN(dataInicio)) {
          titulos.InicioFormatado = titulos.Inicio.toLocaleDateString("pt-BR")
        }
      }

      if (titulos.Fim) {
        const dataFim = new Date(titulos.Fim)
        if (!isNaN(dataFim)) {
          titulos.FimFormatado = titulos.Fim.toLocaleDateString("pt-BR")
        }
      }

      if (titulos.Adicao) {
        const dataAdicao = new Date(titulos.Adicao)
        if (!isNaN(dataAdicao)) {
          titulos.AdicaoFormatado = titulos.Adicao.toLocaleDateString("pt-BR")
        }
      }     
    return titulos;
  });  
  return this.catalogo;
}

  async obterTituloPorID(idTitulo) {
    const titulo = await api.buscarDadosPorId(idTitulo, this.endpoint);
    if (!titulo) return null;

    const catalogo = new Catalogo(
      titulo.id,
      titulo.Titulo,
      titulo.Capa,
      titulo.Tipo,
      titulo.Status,
      titulo.Onde,
      titulo.Inicio,
      titulo.Fim,
      titulo.Episodios,
      titulo.Assistidos,
      titulo.Temporadas,
      titulo.Score,
      titulo.Vezes,
      titulo.Adicao
    );

    if (catalogo.Inicio) {
        const dataInicio = new Date(catalogo.Inicio)
        if (!isNaN(dataInicio)) {
          catalogo.InicioFormatado = catalogo.Inicio.toLocaleDateString("pt-BR")
        }
      }

    if (catalogo.Fim) {
      const dataFim = new Date(catalogo.Fim)
      if (!isNaN(dataFim)) {
        catalogo.FimFormatado = catalogo.Fim.toLocaleDateString("pt-BR")
      }
    } 

    if (catalogo.Adicao) {
      const dataAdicao = new Date(catalogo.Adicao)
      if (!isNaN(dataAdicao)) {
        catalogo.AdicaoFormatado = catalogo.Adicao.toLocaleDateString("pt-BR")
      }
    }    
    return catalogo;
  }

  async salvarTitulo(titulo) {
    const payload = {
      ...titulo,
      Dias: titulo.Dias,
      Progresso: titulo.Progresso
    };

    if (titulo.id) {
      payload.Adicao = new Date(titulo.Adicao);
      await api.atualizarDados(payload, this.endpoint);
    } else {
      payload.id = this.gerarID();
      payload.Adicao = new Date();
      payload.Vezes = 0;
      payload.Score = payload.Score || 0;
      await api.salvarDados(payload, this.endpoint);
    }

    return this.obterCatalogo();
  };

  async excluirTitulo(id) {
    await api.excluirDados(id, this.endpoint);
    return this.obterCatalogo();
  };

  gerarID() {
    if (this.catalogo.length === 0) return 1;
    const maior = Math.max(...this.catalogo.map((t) => t.id || 0));
    return maior + 1;
  };

  filtrarPorStatus(status) {
    return this.catalogo.filter((t) => t.Status === status);
  }

  filtrarPorTipo(tipo) {
    return this.catalogo.filter((t) => t.Tipo === tipo);
  }

  topPorScore(tipo, qtd = 4) {
    return [...this.catalogo]
      .filter((t) => t.Tipo === tipo)
      .sort((a, b) => b.Score - a.Score)
      .slice(0, qtd);
  }

  topGeral(qtd = 4) {
    return [...this.catalogo].sort((a, b) => b.Score - a.Score).slice(0, qtd);
  }

  recentesPorStatus(status, qtd = 4) {
    return this.catalogo
      .filter((t) => t.Status === status)
      .sort((a, b) => {
      const ta = a?.Adicao instanceof Date && !isNaN(a.Adicao) ? a.Adicao.getTime() : 0;
      const tb = b?.Adicao instanceof Date && !isNaN(b.Adicao) ? b.Adicao.getTime() : 0;
      return tb - ta;
    })
      .slice(0, qtd);
  }
  
  assistindo(status, qtd = 4) {
    return this.catalogo
      .filter(titulo => status.includes(titulo.Status))
      .slice(0, qtd);
  }

  recentes(qtd = 3) {
    return [...this.catalogo]
      .sort((a, b) => {
      const ta = a?.Adicao instanceof Date && !isNaN(a.Adicao) ? a.Adicao.getTime() : 0;
      const tb = b?.Adicao instanceof Date && !isNaN(b.Adicao) ? b.Adicao.getTime() : 0;
      return tb - ta;
    })
    .slice(0, qtd);    
  }

  estatisticasPorTipo(tipo) {
    const lista = this.filtrarPorTipo(tipo);

    return {
      total: lista.length,
      dias: lista.reduce((acc, t) => acc + (t.Dias || 0), 0),
      totalEpisodios: lista.reduce((acc, t) => acc + Number(t.Episodios || 0), 0),
      reassistidos: lista.reduce((acc, t) => acc + (t.Vezes || 0), 0),
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
    const totalDias = this.catalogo.reduce((acc, t) => acc + Number(t.Dias || 0), 0);
    const totalHoras = totalDias * 24;
    const totalEpisodios = this.catalogo.reduce((acc, t) => acc + Number(t.Episodios || 0), 0);
    const totalAssistidos = this.catalogo.reduce((acc, t) => acc + Number(t.Assistidos || 0), 0);
    const somaPontuacoes = this.catalogo.reduce((acc, t) => acc + Number(t.Score || 0), 0);

    return {
      Total: this.catalogo.length,
      totalDias,
      totalHoras,
      totalEpisodios,
      totalAssistidos,
      reassistidos: this.catalogo.reduce((acc, t) => acc + Number(t.Vezes || 0), 0),
      assistindo: this.catalogo.filter((t) => t.Status === "Assistindo").length,
      completado: this.catalogo.filter((t) => t.Status === "Completado").length,
      dropped: this.catalogo.filter((t) => t.Status === "Dropped").length,
      planejado: this.catalogo.filter((t) => t.Status === "Planejado").length,
      emEspera: this.catalogo.filter((t) => t.Status === "Em-Espera").length,
      serie: this.catalogo.filter((t) => t.Tipo === "Serie").length,
      filme: this.catalogo.filter((t) => t.Tipo === "Filme").length,
      show: this.catalogo.filter((t) => t.Tipo === "Show").length,
      desenho: this.catalogo.filter((t) => t.Tipo === "Desenho").length,
      documentario: this.catalogo.filter((t) => t.Tipo === "Documentário").length,
      reality: this.catalogo.filter((t) => t.Tipo === "Reality").length,
      mediaPontuacao: this.catalogo.length
        ? Number((somaPontuacoes / this.catalogo.length).toFixed(1))
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
      (p) => this.catalogo.filter((t) => t.Onde === p).length
    );
    return { labels: plataformas, data: valores };
  }
}


