const inputContador = document.getElementById('contador');
const botaoAdicionaContagem = document.getElementById('adiciona-contagem');
const botaoDiminuiContagem = document.getElementById('diminui-contagem');
const novoContador = document.getElementById('contador');

//Aumenta contador
botaoAdicionaContagem.addEventListener("click", (evento) => { 
    evento.preventDefault();
     
    const novaValor = aumentaContador();
    novoContador.innerText = novaValor; 
    
    atualizarContagem()
    
});

//Diminui contador
botaoDiminuiContagem.addEventListener("click", (evento) => { 
    evento.preventDefault();
     
    const novaValor = diminuiContador();
    novoContador.innerText = novaValor;  
    
    atualizarContagem()
});

export function aumentaContador() {    
    let valorcontador = parseInt(inputContador.value) || 0; 
    
    valorcontador += 1;
    inputContador.value = valorcontador;
    return valorcontador;
};

export function diminuiContador() {
    let valorcontador = parseInt(inputContador.value) || 0;
    
   if (valorcontador > 0) {
        valorcontador -= 1;
        inputContador.value = valorcontador;
        return valorcontador;
    }
};

export function atualizarContagem() {
    localStorage.setItem('contagem', novaValor)
};

function exibeContagem() {
    const valorSalvo = localStorage.getItem('contagem');
    if (valorSalvo !== null) {
        inputContador.value = valorSalvo;
        novoContador.innerText = valorSalvo;
    }
};

exibeContagem()