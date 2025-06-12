
function criarData() {
    const diaSemana = new Date().toLocaleDateString('pt-br', { weekday : 'long' });
    const data = new Date().toLocaleDateString('pt-br');
    const hora = new Date().toLocaleTimeString('pt-br', { hour: 'numeric', minute: 'numeric' });
    //const dataItem = `${diaSemana} (${data}) às ${hora}`
    const dataItem = `Adicionado em ${data} às ${hora}`

    return dataItem
}
export default criarData;