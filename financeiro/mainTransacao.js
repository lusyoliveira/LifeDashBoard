import { FinanceiroViewModel } from "./FinanceiroViewModel.js";
import { FinanceiroView } from "./FinanceiroView.js";

document.addEventListener("DOMContentLoaded", async () => {
    const vm = new FinanceiroViewModel();
    const financeiroView = new FinanceiroView(vm);

    financeiroView.listarTransacoes('minhaTabela')
})