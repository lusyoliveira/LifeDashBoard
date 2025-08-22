import { AgendaViewModel } from "./AgendaViewModel.js";
import { AgendaView } from "./AgendaView.js";
import { formatarParaISO } from "../js/metodoData.js";

const formAgenda = document.getElementById('agenda-form');
const btnCancelar = document.getElementById('cancelar-agenda');

document.addEventListener("DOMContentLoaded", async () => {
  const vm = new AgendaViewModel();
  const agendaView = new AgendaView(vm);

//CRUD
  await agendaView.listarAgenda("linhas");

  formAgenda.addEventListener("submit", async (e) => {
    e.preventDefault();

    const idInput = document.getElementById('id-adicionar').value;
    const titulo = document.getElementById('titulo-adicionar').value;
    const data = document.getElementById('data-adicionar').value;
    const categoria = document.getElementById('categoria-adicionar').value;
    const tipo = document.getElementById('tipo-adicionar').value;
    const status = document.getElementById('status-adicionar').value;

    const agendamento = {
        id: idInput.toString(),
        Titulo: titulo,
        Status: status,
        Categoria: categoria,
        Tipo: tipo,
        Data: formatarParaISO(data)
    };
  
    await vm.salvarAgenda(agendamento);
    agendaView.listarAgenda("linhas");
    e.target.reset();
  });

  btnCancelar.addEventListener('click', () => {
    formAgenda.reset();
  });
})