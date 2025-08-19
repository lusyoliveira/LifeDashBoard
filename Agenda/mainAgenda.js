import { AgendaViewModel } from "./AgendaViewModel.js";
import { AgendaView } from "./AgendaView.js";

const formAgenda = document.getElementById('agenda-form');
const btnCancelar = document.getElementById('cancelar-agenda');

document.addEventListener("DOMContentLoaded", async () => {
  const vm = new AgendaViewModel();
  const agendaView = new AgendaView(vm);

//CRUD
  await agendaView.listarAgenda("linhas");

  formAgenda.addEventListener("submit", async (e) => {
    e.preventDefault();
    const compromisso = agendaView.preencherAgenda("formAgenda");
    await vm.salvarAgenda(compromisso);
    agendaView.listarAgenda("linhas");
    e.target.reset();
  });

  btnCancelar.addEventListener('click', () => {
    formAgenda.reset();
  });
})