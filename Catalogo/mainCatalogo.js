import { CatalogoViewModel } from "./CatalogoViewModel.js";
import { CatalogoView } from "./CatalogoView.js";
import { formatarParaISO } from "../js/metodoData.js";

document.addEventListener("DOMContentLoaded", async () => {
  const vm = new CatalogoViewModel();
  const catalogoView = new CatalogoView(vm);
  const formCatalogo = document.getElementById("catalogo-form");
  const btnCancelar = document.getElementById("cancelar-catalogo");

  //CRUD
  await catalogoView.listarCatalogo("linhas");

  formCatalogo.addEventListener("submit", async (e) => {
    e.preventDefault();
    
        const idInput = document.getElementById('id-adicionar').value;
        const descricao = document.getElementById('titulo-adicionar').value;
        const dataInicio = document.getElementById('data-inicio').value;
        const dataFim = document.getElementById('data-fim').value;
        const tipo = document.getElementById('tipo-adicionar').value;
        const status = document.getElementById('status-adicionar').value;
        const plataforma = document.getElementById('plataforma-adicionar').value;
        const episodios = document.getElementById('episodios-adicionar').value;
        const assistidos = document.getElementById('assistidos-adicionar').value;
        const temporada = document.getElementById('temporada-adicionar').value;
        const pontuacao = document.getElementById('pontuacao-adicionar').value;

        const titulo = {
            id: idInput.toString(),
            Titulo: descricao,
            Tipo: tipo,
            Status: status,
            Onde: plataforma,
            Inicio: formatarParaISO(dataInicio),
            Fim:  dataFim === '' ? '' : formatarParaISO(dataFim),
            Episodios: Number(episodios),
            Assistidos: Number(assistidos),
            Temporadas: Number(temporada),
            Score: Number(pontuacao),
        }
       
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
  catalogoView.renderContagemGeral("geral-dias", "Dias");
  catalogoView.renderContagemGeral("geral-horas", "Horas");
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
