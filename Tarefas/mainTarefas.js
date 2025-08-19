import { TarefasViewModel } from "./TarefasViewModel.js";
import { TarefasView } from "./TarefasView.js";

document.addEventListener("DOMContentLoaded", async () => {
  const vm = new TarefasViewModel();
  const tarefasView = new TarefasView(vm);

    
})