const inputContador = document.getElementById('contador');

export function aumentaContador() {    
    let valorcontador = parseInt(inputContador.value) || 0; // garante que seja número
    
    valorcontador += 1;
    inputContador.value = valorcontador;
    return valorcontador;
}

export  function diminuiContador() {
    let valorcontador = parseInt(inputContador.value) || 0;
    
   if (valorcontador > 0) {
        valorcontador -= 1;
        inputContador.value = valorcontador;
        return valorcontador;
    }
}