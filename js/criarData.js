export function criarData() {
    const diaSemana = new Date().toLocaleDateString('pt-br', { weekday : 'long' });
    const data = new Date().toLocaleDateString('pt-br');
    const hora = new Date().toLocaleTimeString('pt-br', { hour: 'numeric', minute: 'numeric' });
    //const dataItem = `${diaSemana} (${data}) às ${hora}`
    const dataItem = `Adicionado em ${data} às ${hora}`

    return dataItem
};

export function converteData(dataAmericana) {
    const data = new Date(dataAmericana);
    const dataBrasileira = data.toLocaleDateString('pt-BR');

    return dataBrasileira
};

export function intervaloData(dataAlvo) {  
    const data = new Date(dataAlvo);
    const dataAtual = new Date();

    // Diferença em milissegundos
    const diffMs = Math.abs(dataAtual - data);

    // Conversões
    const diffSegundos = Math.floor(diffMs / 1000);
    const diffMinutos = Math.floor(diffSegundos / 60);
    const diffHoras = Math.floor(diffMinutos / 60);
    const diffDias = Math.floor(diffHoras / 24);

    // Conversão para meses e anos 
    const anos = dataAtual.getFullYear() - data.getFullYear();
    const meses = anos * 12 + (dataAtual.getMonth() - data.getMonth());

    if (diffSegundos == 1) {
        return `Há ${diffSegundos} segundo`;
    } else if (diffSegundos > 1) {

    }
};