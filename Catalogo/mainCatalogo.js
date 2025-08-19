import { CatalogoViewModel } from "./CatalogoViewModel.js";
import { CatalogoView } from "./CatalogoView.js";

document.addEventListener("DOMContentLoaded", async () => {
  const vm = new CatalogoViewModel();
  const catalogoView = new CatalogoView(vm);
  const formCatalogo = document.getElementById("catalogo-form");
  const btnCancelar = document.getElementById("cancelar-catalogo");

  //CRUD
  await catalogoView.listarCatalogo("linhas");
  catalogoView.bindExcluir(async (id) => {
    await vm.excluirTitulo(id);
    catalogoView.listarCatalogo("linhas");
  });
  catalogoView.bindEditar((id) => {
    catalogoView.preencherTitulo("formCatalogo");
  });

  formCatalogo.addEventListener("submit", async (e) => {
    e.preventDefault();
    const titulo = catalogoView.preencherTitulo("formCatalogo");
    await vm.salvarTitulo(titulo);
    catalogoView.listarCatalogo("linhas");
    e.target.reset();
  });

  btnCancelar.addEventListener('click', () => {
    formCatalogo.reset();
  });

  //Contagem
  catalogoView.renderContagemGeral("geral-progresso", "Progresso");
  catalogoView.renderContagemGeral("geral-total", "Total");
  catalogoView.renderContagemGeral("geral-pontuacao", "Pontuacao");
  catalogoView.renderContagemGeral("geral-assistidos", "Assistidos");
  catalogoView.renderContagemGeral("geral-episodios", "Episodios");
  catalogoView.renderContagemGeral("geral-dias", "Pontuacao");
  catalogoView.renderContagemGeral("contagem-completado", "Completado");
  catalogoView.renderContagemGeral("contagem-assistindo", "Assistindo");
  catalogoView.renderContagemGeral("contagem-dropped", "Dropped");
  catalogoView.renderContagemGeral("contagem-emespera", "Em-Espera");
  catalogoView.renderContagemGeral("contagem-planejado", "Planejado");
  //catalogoView.renderContagemGeral('contagem-anime','Anime')
  catalogoView.renderContagemGeral("contagem-desenho", "Desenho");
  catalogoView.renderContagemGeral("contagem-documentario", "Documentário");
  catalogoView.renderContagemGeral("contagem-filme", "Filme");
  catalogoView.renderContagemGeral("contagem-serie", "Serie");
  catalogoView.renderContagemGeral("contagem-show", "Show");
  catalogoView.renderContagemGeral("contagem-reality", "Reality");
  //catalogoView.renderContagemGeral('contagem-manga','Manga')

  //Estatísticas
  catalogoView.renderEstatistica("Serie", "estatistica-serie");
  catalogoView.renderEstatistica("Filme", "estatistica-filme");
  catalogoView.renderEstatistica("Desenho", "estatistica-desenho");

  //Gráficos
  catalogoView.renderGraficos();

  // Adicionados Recentemente
  catalogoView.renderRecentes("recentes");

  //Card por Status
  catalogoView.renderCardStatus("Assistindo", "lista-assistindo");
  catalogoView.renderCardStatus("Planejado", "lista-planejado");
  catalogoView.renderCardStatus("Em-Espera", "lista-espera");
  catalogoView.renderCardStatus("Dropped", "lista-dropped");

  //Card por Tipo
  catalogoView.renderCardGeral("lista-geral");
  catalogoView.renderCardTipo("Filme", "lista-filmes");
  catalogoView.renderCardTipo("Serie", "lista-series");
});
