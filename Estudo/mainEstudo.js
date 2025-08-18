import { EstudoViewModel } from "./EstudoViewModel.js";
import { EstudoView } from "./EstudoView.js"

document.addEventListener("DOMContentLoaded", async () => {
  const vm = new EstudoViewModel();
  const estudoView = new EstudoView(vm);

  //CRUD
  await estudoView.listarCursos("linhas");
})