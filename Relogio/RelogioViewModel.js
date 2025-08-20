export class RelogioViewModel {

    constructor() {
        this.relogio = {}
    }

    async *atualizaRelogio() {
        const now = new Date();

        // Pega as horas, minutos e segundos
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        // Atualiza relógio digital
        const horaFormatada = String(hours).padStart(2, '0');
        const minutoFormatado = String(minutes).padStart(2, '0');
        const segundoFormatado = String(seconds).padStart(2, '0');
        
        this.relogio = { horaFormatada, minutoFormatado, segundoFormatado}
        
        yield this.relogio
        await new Promise(resolve => setTimeout(resolve, 1000))
    }

    calculaPonteiros(relogio) {
        // Cálculo dos ângulos dos ponteiros
        const secondsDegrees = (relogio.seconds / 60) * 360 + 90;
        const minutesDegrees = (relogio.minutes / 60) * 360 + (relogio.seconds / 60) * 6 + 90;
        const hoursDegrees = (relogio.hours % 12) / 12 * 360 + (relogio.minutes / 60) * 30 + 90;

        const angulos = { secondsDegrees, minutesDegrees, hoursDegrees}

        return angulos
    }
}