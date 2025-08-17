import { CatalogoViewModel } from "./viewmodels/CatalogoViewModel.js";
import { CatalogoView } from "./views/CatalogoView.js";

document.addEventListener("DOMContentLoaded", async () => {
    const vm = new CatalogoViewModel();
    const catalogoView = new CatalogoView(vm);

    //CRUD
    await catalogoView.listarCatalogo("linhas");
    catalogoView.bindExcluir(async (id) => {
        await vm.excluirTitulo(id);
        catalogoView.listarCatalogo("linhas");
    });
    catalogoView.bindEditar((id) => {
        console.log("Editar título ID:", id);
    });
    //Contagem
    catalogoView.renderContagemGeral("geral-total","Total")
    catalogoView.renderContagemGeral("geral-pontuacao")

    //Estatísticas
    catalogoView.renderEstatistica("Serie", "estatistica-serie");
    catalogoView.renderEstatistica("Filme", "estatistica-filme");
    catalogoView.renderEstatistica("Desenho", "estatistica-desenho");
    
    //Gráficos
    catalogoView.renderGraficos();

    // Adicionados Recentemente
    catalogoView.renderRecentes("recentes");

    //Card por Status
    catalogoView.renderCardStatus("Assistindo","lista-assistindo")
    catalogoView.renderCardStatus("Planejado","lista-planejado")
    catalogoView.renderCardStatus("Em-Espera","lista-espera")
    catalogoView.renderCardStatus("Dropped","lista-dropped")

    //Card por Tipo
    catalogoView.renderCardGeral("lista-geral")
    catalogoView.renderCardTipo("Filme","lista-filmes")
    catalogoView.renderCardTipo("Serie","lista-series")
});
