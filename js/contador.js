function aumentarNumero() {
    let contador = parseInt(document.getElementById('contador').value);
    
        contador = contador+1;

    document.getElementById("contador").value = contador;
}

function diminuirNumero() {
    let contador = parseInt(document.getElementById('contador').value);
    
   if (contador > 0) {
        contador = contador-1;
    }
    
    document.getElementById("contador").value = contador;
}