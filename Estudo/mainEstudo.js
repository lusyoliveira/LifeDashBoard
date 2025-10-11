import { EstudoViewModel } from "./EstudoViewModel.js";
import { EstudoView } from "./EstudoView.js"
import Curso from "../Estudo/Estudo.js";


document.addEventListener("DOMContentLoaded", async () => {
  const vm = new EstudoViewModel();
  const estudoView = new EstudoView(vm);

  const formCurso = document.getElementById('curso-form');
  const btnCancelar = document.getElementById('cancelar-curso');

  //CRUD
  await estudoView.listarCursos("linhas");

  formCurso.addEventListener("submit", async (e) => {
     e.preventDefault();
 
     const idInput = document.getElementById('id-adicionar').value;
     const tituloCurso = document.getElementById('curso-adicionar').value;
     const instrutor = document.getElementById('instrutor-adicionar').value;
     const area = document.getElementById('area-adicionar').value;
     const dataCompra = document.getElementById('data-adicionar').value;
     const valor = document.getElementById('valor-adicionar').value;
     const status = document.getElementById('status-adicionar').value;
     const certificado = document.getElementById('certificado-adicionar').value;

     const curso = new Curso(
        idInput ? Number(idInput) : null,
        Capa,
        Escola,
        Number(Aulas),
        Number(Assistido),
        Number(Horas),
        tituloCurso,
        instrutor,
        area,
        formatarParaISO(dataCompra),
        Number(valor),
        status,
        certificado
     );
   
     await vm.salvarCurso(curso);
     estudoView.listarCursos("linhas");
     e.target.reset();
   });

  btnCancelar.addEventListener('click', () => {
      formCurso.reset();
  });

});

