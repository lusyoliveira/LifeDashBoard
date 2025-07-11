export function criarData() {
    const diaSemana = new Date().toLocaleDateString('pt-br', { weekday : 'long' });
    const data = new Date().toLocaleDateString('pt-br');
    const hora = new Date().toLocaleTimeString('pt-br', { hour: 'numeric', minute: 'numeric' });
    const dataItem = `Adicionado em ${data} às ${hora}`

    return dataItem
};

export function converteDataUTC(dataString) {
    const [ano, mes, dia] = dataString.split('-')

    return new Date(Date.UTC(ano, mes - 1, dia))
};

export function calculaTempoData(dataTexto) {  
    const partes = dataTexto.split('/');
    const dataAlvo = new Date(partes[2], partes[1] - 1, partes[0]);
    const agora = new Date();

    // Zera as horas para comparar apenas datas
    dataAlvo.setHours(0, 0, 0, 0);
    agora.setHours(0, 0, 0, 0);

    const diffMs = dataAlvo - agora;
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const passado = diffDias < 0;
    const dias = Math.abs(diffDias);

    const anos = Math.floor(dias / 365);
    const meses = Math.floor((dias % 365) / 30);
    const restantes = dias % 30;

    let frase = '';

    if (dias === 0) {
        frase = 'Hoje';
    } else if (dias === 1) {
        frase = passado ? 'Ontem' : 'Amanhã';
    } else if (anos >= 1) {
        frase = `${passado ? 'Há' : 'Em'} ${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    } else if (meses >= 1) {
        frase = `${passado ? 'Há' : 'Em'} ${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    } else {
        frase = `${passado ? 'Há' : 'Em'} ${dias} dias`;
    }

    return frase;
      
};