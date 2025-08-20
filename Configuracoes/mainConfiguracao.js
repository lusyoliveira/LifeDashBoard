import { ConfiguracaoViewModel } from './ConfiguracaoViewModel.js'
import { ConfiguracaoView } from './ConfiguracaoView.js'

document.addEventListener('DOMContentLoaded', async () => {
    const vm = new ConfiguracaoViewModel();
    const configuracaoView = new ConfiguracaoView(vm);

    configuracaoView.configuracaoContagem('linha-contagem')
    configuracaoView.configuracaoGoogle('linha-google')
    configuracaoView.configuracaoMAL('linha-mal')
    configuracaoView.configuracaoOutlook('linha-outlook')
    configuracaoView.configuracaoClima('linha-clima')

    const btnSalvar = document.getElementById('btn-salvar');
    btnSalvar.addEventListener('click', () =>{
        
    })
});