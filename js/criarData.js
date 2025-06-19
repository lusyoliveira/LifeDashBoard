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

export function calculaTempoData(dataAlvo) {  
    const partes = dataAlvo.split('/');
    const data = new Date(partes[2], partes[1] - 1, partes[0]);
    const dataAtual = new Date();
    let tempo = '';

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
        tempo = `Há ${diffSegundos} segundo`;
    } else if (diffSegundos > 1 && diffSegundos < 60) {
        tempo = `Há ${diffSegundos} segundos`;
    } else if (diffMinutos == 1) {
        tempo = `Há ${diffMinutos} minuto`;
    } else if (diffMinutos > 1  && diffMinutos < 60) {
        tempo = `Há ${diffMinutos} minutos`;
    } else if (diffHoras == 1) {
        tempo = `Há ${diffHoras} hora`;
    } else if (diffHoras > 1 && diffHoras < 24) {
        tempo = `Há ${diffHoras} horas`;
    } else if (diffDias == 1) {
        tempo = `Há ${diffDias} dia`;
    } else if (diffDias > 1 && diffDias < 31) {
        tempo = `Há ${diffDias} dias`;
    } else if (meses == 1) {
        tempo = `Há ${meses} mês`;
    } else if (meses > 1 && meses <= 12) {
        tempo = `Há ${meses} meses`;
    } else if (anos == 1) {
        tempo = `Há ${anos} ano`;
    } else if (anos > 1) {
        tempo = `Há ${anos} anos`;
    } else {
        tempo = 'Tempo Indefinido';
    }

    return tempo
   
};