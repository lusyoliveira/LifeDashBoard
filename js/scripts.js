window.onload = function coutndown() {
const dataAlvo = new Date("Apr 29, 2026 00:04:25").getTime();
const intervalo = setInterval(() => {
    const dataAtual = new Date().getTime();
    const tempoRestante = dataAlvo - dataAtual;

    if (tempoRestante <= 0) {
        clearInterval(intervalo);
        return;
    }

    const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);

    document.querySelector("#dias").innerHTML = dias;
    document.querySelector("#horas").innerHTML = horas;
    document.querySelector("#minutos").innerHTML = minutos;
    document.querySelector("#segundos").innerHTML = segundos;
}, 1000);
};

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


//Abrir Página
 function carregarPagina(pagina) {
     fetch(pagina)
         .then(response => response.text())
         .then(data => {
             document.getElementById("conteudo").innerHTML = data;
         })
         .catch(error => console.error("Erro ao carregar a página:", error));
 };

 function abrirMenu() {
    document.getElementById("menuLateral").style.width = "250px";
};

function fecharMenu() {
    document.getElementById("menuLateral").style.width = "0";
};

//Slider
const images = document.querySelectorAll('#imageSlider img');
let currentIndex = 0;

document.getElementById('prevBtn').addEventListener('click', () => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    images[currentIndex].classList.add('active');
});

document.getElementById('nextBtn').addEventListener('click', () => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    images[currentIndex].classList.add('active');
});

// Auto-slide every 5 seconds
setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    images[currentIndex].classList.add('active');
}, 5000);