export function contagemRegressiva() {
    const dataAlvo = new Date("Sep 22, 2025 15:29:00").getTime();
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
