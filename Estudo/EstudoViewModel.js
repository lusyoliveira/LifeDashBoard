import api from "../js/metodoApi.js";
import Curso from "../Estudo/Estudo.js";

export class EstudoViewModel {
  constructor(endpoint = "cursos") {
    this.endpoint = endpoint;
    this.cursos = [];
  }

  async obterCursos() {
    const cursosData = await api.buscarDados(this.endpoint);

    this.cursos = cursosData.map(curso => {
      const cursos = new Curso(
        curso.id,
        curso.Capa,
        curso.Escola,
        curso.Aulas,
        curso.Assistido,
        curso.Horas,
        curso.Name,
        curso.Professor,
        curso.Assunto,
        curso.Comprado,
        curso.Valor,
        curso.Status,
        curso.Certificado
      );
      
        return cursos;
    });   
    return this.cursos;
  }

  async obterCursoPorID(idCurso) {
    const curso = await api.buscarDadosPorId(idCurso, this.endpoint);
    if (!curso) return null;

      const cursos = new Curso(
        curso.id,
        curso.Capa,
        curso.Escola,
        curso.Aulas,
        curso.Assistido,
        curso.Horas,
        curso.Name,
        curso.Professor,
        curso.Assunto,
        curso.Comprado,
        curso.Valor,
        curso.Status,
        curso.Certificado
      );

    return cursos;
  }

  async salvarCurso(curso) {
    if (curso.id) {
      await api.atualizarDados(curso, this.endpoint);
    } else {
      curso.id = this.gerarID()
      await api.salvarDados(curso, this.endpoint);
    }
    return this.obterCursos();
  }

  async excluirCurso(id) {
    await api.excluirDados(id, this.endpoint);
    return this.obterCursos();
  }

  gerarID() {
    if (this.cursos.length === 0) return "1";
    const maior = Math.max(...this.cursos.map((t) => t.id || 0));
    return String(maior + 1);
  };

  cursando(qtd = 3) {
      return this.cursos
          .filter(curso => curso.Status === "Cursando")
          .slice(0, qtd);
  }

}