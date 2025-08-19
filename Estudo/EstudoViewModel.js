import api from "../js/metodoApi.js";
//import Estudo from "../Estudo.js";

export class EstudoViewModel {
  constructor(endpoint = "cursos") {
    this.endpoint = endpoint;
    this.cursos = [];
  }

  async obterCursos() {
    let estudos = [];

    estudos = await api.buscarDados(this.endpoint);
    this.cursos = estudos.map(curso => {
        return {
            ...curso,
            Comprado: new Date(curso.Comprado).toLocaleDateString('pt-BR')
        };
    });
    return this.cursos;
  }
  cursando(qtd = 3) {
      return this.cursos
          .filter(curso => curso.Status === "Cursando")
          .slice(0, qtd);
  }

}